---
name: zhihu-knowledge-01-controller
description: 启动并控制知乎技术知识炼金工作流；当用户要把知乎问题、回答、话题或匿名问答素材转化为观点对照、学习卡片、知识图谱或创新路线时触发。建立本地项目并调度02至12，不依赖外部协作平台。
---

# 知乎知识炼金总控

把知乎社区内容转化为有来源边界、可核查、可学习和可继续探索的知识产品。

## 启动

1. 确认项目键、目标问题和模式：官方实时模式、用户提供内容或匿名演示。
2. 优先确认项目已安装原样的官方 `.codex/skills/zhihu-hackathon` 和 `.codex/skills/zhihu`，运行时只使用知乎开放平台公开接口。
3. 快速体验执行 `alchemize`，一次完成官方搜索、知乎直答、观点矩阵、知识简报、学习卡片和创新路线。
4. 深度研究先由02采集，再让03依据本地项目状态路由04至12。每项模型归纳都要保留来源编号和证据边界。
5. 12负责导出。发布、报名或向知乎账号写入内容属于外部动作，必须有用户明确指令。

## 核心命令

```powershell
python runtime/zhihu_knowledge.py init --project-key ZHIHU-001 --title "项目标题"
python runtime/zhihu_knowledge.py alchemize --project-key ZHIHU-001 --query "要研究的问题"
python runtime/zhihu_knowledge.py status --project-key ZHIHU-001
python runtime/zhihu_knowledge.py put-artifact --project-key ZHIHU-001 --stage 4 --type concept_map --title "概念图" --file artifact.json
```

实时模式只从服务端环境变量读取 `ZHIHU_ACCESS_SECRET`。不得网页抓取、不得把密钥写入项目库或发给浏览器。未配置时使用匿名演示并清楚标注。
