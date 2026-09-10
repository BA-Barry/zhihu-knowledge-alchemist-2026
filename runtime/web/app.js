const params = new URLSearchParams(location.search);
let projectKey = params.get("project") || "ZHIHU-DEMO-001";
let liveReady = false;

const elements = {
  form: document.querySelector("#alchemyForm"),
  query: document.querySelector("#query"),
  count: document.querySelector("#count"),
  run: document.querySelector("#runButton"),
  demo: document.querySelector("#demoButton"),
  formStatus: document.querySelector("#formStatus"),
  serviceState: document.querySelector("#serviceState"),
  title: document.querySelector("#title"),
  stats: document.querySelector("#stats"),
  sources: document.querySelector("#sources"),
  artifacts: document.querySelector("#artifacts"),
  exportLink: document.querySelector("#exportLink"),
};

function safe(value) {
  return String(value ?? "").replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character]));
}

function safeUrl(value) {
  try {
    const url = new URL(String(value));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

async function requestJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "请求失败");
  return data;
}

function setBusy(isBusy, message = "") {
  elements.run.disabled = isBusy || !liveReady;
  elements.demo.disabled = isBusy;
  elements.query.disabled = isBusy;
  elements.count.disabled = isBusy;
  elements.run.textContent = isBusy ? "正在提炼" : "开始炼金";
  if (isBusy) {
    elements.formStatus.className = "form-status working";
  } else if (elements.formStatus.classList.contains("working")) {
    elements.formStatus.className = "form-status";
  }
  elements.formStatus.textContent = message;
  if (isBusy) renderSkeleton();
}

function renderSkeleton() {
  elements.artifacts.innerHTML = Array.from({length: 4}, (_, index) => `
    <article class="artifact skeleton" style="--delay: ${index * 80}ms" aria-hidden="true">
      <span></span><span></span><span></span>
    </article>
  `).join("");
}

function renderValue(value) {
  if (Array.isArray(value)) {
    if (!value.length) return '<p class="empty-inline">暂无内容</p>';
    return `<div class="value-list">${value.map(item => `
      <div class="value-item">${typeof item === "object" ? renderValue(item) : safe(item)}</div>
    `).join("")}</div>`;
  }
  if (value && typeof value === "object") {
    return `<dl class="value-object">${Object.entries(value).map(([key, item]) => `
      <div>
        <dt>${safe(labelFor(key))}</dt>
        <dd>${renderValue(item)}</dd>
      </div>
    `).join("")}</dl>`;
  }
  return `<p>${safe(value)}</p>`;
}

function labelFor(key) {
  return ({
    summary: "核心概览",
    key_points: "关键要点",
    unknowns: "未知与边界",
    consensus: "主要共识",
    differences: "观点分歧",
    source_notes: "来源贡献",
    topic: "议题",
    positions: "观点",
    source: "来源编号",
    note: "说明",
    cards: "学习卡片",
    question: "自测问题",
    answer: "参考答案",
    source_refs: "来源编号",
    opportunities: "机会",
    next_steps: "下一步",
    evaluation: "验证方式",
    core_question: "核心问题",
    concepts: "关键概念",
    constraints: "现实约束",
    near_term: "近期行动",
    prototype: "原型方向",
    unresolved: "待解决问题",
  })[key] || key.replaceAll("_", " ");
}

function renderProject(data) {
  const {project, sources, artifacts} = data;
  projectKey = project.project_key;
  history.replaceState(null, "", `?project=${encodeURIComponent(projectKey)}`);
  elements.title.textContent = project.title;
  elements.exportLink.href = `/api/export?key=${encodeURIComponent(projectKey)}`;
  elements.stats.innerHTML = [
    [sources.length, "条来源"],
    [artifacts.length, "项成果"],
    [`${project.current_stage}/12`, "流程进度"],
  ].map(([value, label]) => `
    <div class="stat"><strong>${safe(value)}</strong><span>${safe(label)}</span></div>
  `).join("");

  elements.sources.innerHTML = sources.map((source, index) => {
    const url = safeUrl(source.url);
    const metadata = source.metadata || {};
    const title = source.title || `来源 ${index + 1}`;
    return `
      <article class="source-row">
        <span class="source-index">${String(index + 1).padStart(2, "0")}</span>
        <div class="source-body">
          <p class="source-meta">${safe(source.author || "未署名")} <span>${safe(source.source_kind)}</span></p>
          <h3>${url ? `<a href="${safe(url)}" target="_blank" rel="noreferrer">${safe(title)}</a>` : safe(title)}</h3>
          <p class="source-excerpt">${safe(source.content || "该来源没有返回摘要。")}</p>
        </div>
        <div class="source-signals">
          <span>赞同 ${safe(metadata.voteup_count ?? "未知")}</span>
          <span>评论 ${safe(metadata.comment_count ?? "未知")}</span>
        </div>
      </article>
    `;
  }).join("") || '<div class="empty-state">还没有证据来源。载入演示或开始一次炼金。</div>';

  elements.artifacts.innerHTML = artifacts.map((artifact, index) => `
    <article class="artifact" style="--delay: ${index * 70}ms">
      <p class="artifact-type">${safe(artifact.title)}</p>
      ${renderValue(artifact.content)}
    </article>
  `).join("") || '<div class="empty-state">成果会在这里出现。</div>';
}

async function loadHealth() {
  try {
    const health = await requestJson("/api/health");
    liveReady = Boolean(health.live_mode_ready);
    const answerUsage = health.local_daily_usage?.direct_answer;
    elements.serviceState.textContent = liveReady && answerUsage
      ? `官方接口已连接  直答 ${answerUsage.used}/${answerUsage.limit}`
      : "演示模式";
    elements.serviceState.classList.toggle("ready", liveReady);
    elements.run.disabled = !liveReady;
    elements.run.title = liveReady ? "" : "请先在服务端配置 ZHIHU_ACCESS_SECRET";
  } catch {
    elements.serviceState.textContent = "服务检查失败";
    elements.serviceState.classList.add("error");
  }
}

async function loadProject() {
  try {
    const data = await requestJson(`/api/project?key=${encodeURIComponent(projectKey)}`);
    renderProject(data);
  } catch (error) {
    elements.title.textContent = "项目尚未就绪";
    elements.sources.innerHTML = `<div class="empty-state">${safe(error.message)} 点击“载入演示”即可查看完整效果。</div>`;
    elements.artifacts.innerHTML = '<div class="empty-state">等待项目数据。</div>';
  }
}

elements.form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!liveReady) {
    elements.formStatus.className = "form-status error";
    elements.formStatus.textContent = "当前未配置 Access Secret，请先使用演示模式。";
    return;
  }
  const query = elements.query.value.trim();
  if (!query) return;
  setBusy(true, "正在搜索知乎内容，并由知乎直答提炼知识结构。通常需要几十秒。");
  try {
    const data = await requestJson("/api/alchemize", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query, count: Number(elements.count.value), project_key: "ZHIHU-LIVE-001"}),
    });
    renderProject(data.project);
    const cacheHits = Object.values(data.cache || {}).filter(Boolean).length;
    elements.formStatus.className = "form-status success";
    elements.formStatus.textContent = cacheHits
      ? `炼金完成，其中 ${cacheHits} 个请求来自本地缓存。`
      : "炼金完成，结果已经保存并可导出。";
  } catch (error) {
    elements.formStatus.className = "form-status error";
    elements.formStatus.textContent = error.message;
    await loadProject();
  } finally {
    setBusy(false, elements.formStatus.textContent);
  }
});

elements.demo.addEventListener("click", async () => {
  setBusy(true, "正在载入匿名演示数据。");
  try {
    const data = await requestJson("/api/demo/reset", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({project_key: "ZHIHU-DEMO-001"}),
    });
    renderProject(data);
    elements.formStatus.className = "form-status success";
    elements.formStatus.textContent = "演示已载入。演示数据不会消耗知乎接口配额。";
  } catch (error) {
    elements.formStatus.className = "form-status error";
    elements.formStatus.textContent = error.message;
  } finally {
    setBusy(false, elements.formStatus.textContent);
  }
});

Promise.all([loadHealth(), loadProject()]);
