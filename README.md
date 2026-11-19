# 知乎技术知识炼金助手

把分散在知乎问题和回答中的多元观点，转化为可核查、可复习、可继续行动的结构化知识。

**在线体验：** <https://pnnsklzkknse.sealoshzh.site>

> 当前可直接使用匿名 Demo 体验完整流程。配置知乎开放平台 Access Secret 后，可使用官方搜索和直答接口处理真实问题。

## 它能做什么

用户输入一个想弄懂的问题，系统从相关讨论中提取并呈现四类成果：

1. **问题—概念—约束图**：明确真正要解决的问题、关键概念和现实边界；
2. **观点对照**：分开展示共识、分歧、适用条件和未解问题；
3. **学习卡片**：把关键结论改写为可自测、可复习的问答材料；
4. **创新路线**：将争议和证据缺口转化为可执行、可验证的下一步。

每项结论都保留来源边界。用户可以回看原始内容，也可导出 Markdown 继续学习、研究或创作。

## 知乎与 AI 如何分工

- **知乎**：提供真实问题、多元回答、作者与社区互动语境，并通过官方搜索召回相关内容；
- **AI**：对齐跨来源概念，区分共识和冲突，生成知识结构、学习卡片与验证路线；
- **系统边界**：赞同数和评论数只是社区语境，不作为真假判断；模型不把多位作者的内容拼成任何人的原话。

## 主要能力

- 可点击的 Web 完整流程：输入、加载、结果、来源核查与导出；
- 对接 `zhihu_search`、`global_search`、`hot_list` 和 `chat/completions`；
- 搜索、热榜和直答结果本地缓存，减少重复调用和配额消耗；
- 12 个可组合的 Codex Skills，覆盖采集、概念图、证据研究、观点综合、简报、卡片、知识图谱、复核和发布；
- SQLite 本地数据库、Markdown 导出、Windows/macOS 安装与启动脚本；
- Docker 镜像和 GitHub Actions 自动构建；
- Access Secret 仅由服务端环境变量读取，不进入浏览器、数据库或导出文件。

## 30 秒体验

Windows：

```powershell
powershell -ExecutionPolicy Bypass -File .\启动Demo-windows.ps1
```

macOS：

```bash
chmod +x ./启动Demo-mac.command
./启动Demo-mac.command
```

浏览器打开后点击“载入演示”，无需账号或密钥。

## 使用真实知乎数据

从 [知乎开发者平台](https://developer.zhihu.com/profile) 获取 Access Secret，然后运行安全启动脚本：

```powershell
powershell -ExecutionPolicy Bypass -File .\启动正式版-windows.ps1
```

脚本会隐藏输入，且不会把密钥保存到磁盘。详细说明见 [使用说明.md](使用说明.md) 和 [docs/知乎API配置说明.md](docs/知乎API配置说明.md)。

## 项目结构

- `runtime/`：官方 API、缓存、数据库与 Web 服务；
- `runtime/web/`：原生 HTML/CSS/JS 产品页；
- `skills/`：12 个知识炼金 Skills；
- `demo/`：不消耗外部接口配额的匿名演示数据；
- `tests/`：核心运行时与 Web API 自动测试；
- `docs/`：产品、架构、部署、OAuth 与验收记录。

## 验证

```powershell
python -m unittest discover -s tests -v
```

当前自动测试覆盖官方搜索字段归一化、缓存与软限额、结构化成果、业务错误、匿名 Demo、健康接口和 Markdown 导出。
