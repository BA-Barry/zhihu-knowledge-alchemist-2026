---
name: zhihu-knowledge-12-publish-export
description: 汇总知乎知识项目的来源、简报、卡片、图谱、复核和创新路线，生成本地 Markdown/JSON 发布包；当用户要导出、制作演示或准备知乎内容时使用。只有用户明确要求并确认目标账号与内容后才执行线上发布。
---

# 成果导出与发布准备

先用网页“导出 Markdown”或运行时 `export` 生成本地成果。发布包应包括：问题背景、来源范围、观点对照、外部证据、知识简报、学习卡片、图谱数据、创新路线和限制说明。

另存阶段12 JSON：

```json
{
  "audience": "",
  "title_options": [],
  "summary": "",
  "sections": [],
  "source_links": [],
  "limitations": [],
  "demo_highlights": []
}
```

保存类型为 `publish_package`。比赛提交包还需另附公网体验链接、产品方案文档，推荐附公开代码仓库和演示视频。本地导出不等于发布；向知乎提交文章、回答、报名表或项目文件均是外部动作，未获用户明确指令时只准备草稿和文件。
