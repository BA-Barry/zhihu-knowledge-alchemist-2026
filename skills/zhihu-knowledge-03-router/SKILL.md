---
name: zhihu-knowledge-03-router
description: 根据本地知乎知识项目的来源和已有成果选择下一处理阶段；当内容已导入、流程中断后恢复或用户询问下一步时使用。只路由到04至12中最早缺失且输入充分的阶段。
---

# 动态任务路由

读取运行时 `status`，根据成果类型选择最早缺失阶段：

- 无 `concept_map` → 04
- 无 `evidence_research` → 05
- 无 `viewpoint_matrix` → 06
- 无 `knowledge_brief` → 07
- 无 `learning_cards` → 08
- 无 `knowledge_graph` → 09
- 无 `evidence_review` → 10
- 无 `innovation_roadmap` → 11
- 无 `publish_package` → 12

`alchemize` 快速模式会直接形成 `viewpoint_matrix`、`knowledge_brief`、`learning_cards` 和 `innovation_roadmap`，用于比赛现场的一键体验。这不代表04、05、09、10和12已经完成；用户要求完整研究包时仍按最早缺失项继续。

如果来源只有标题而无可分析正文，退回02。若用户只要求某一单项成果，可以直接路由到相应阶段，但必须说明哪些上游证据尚未形成，避免把省略步骤伪装成已完成。

返回下一阶段编号、原因、所需输入和预期成果，不在路由阶段代写内容，也不把快速演示状态伪装成完整研究状态。
