---
name: zhihu-knowledge-04-concept-map
description: 从知乎问题和回答中提取核心问题、概念、约束、因果主张和未定义术语；当项目需要建立后续检索与比较所用的问题地图时使用。不评价观点真伪，不虚构来源未提及的技术事实。
---

# 问题与概念图

逐条读取来源，区分提问者目标、回答者主张和模型归纳。输出 JSON：

```json
{
  "core_question": "",
  "sub_questions": [],
  "concepts": [{"name": "", "definition_from_sources": "", "source_ids": []}],
  "constraints": [{"constraint": "", "source_ids": []}],
  "causal_claims": [{"claim": "", "source_ids": []}],
  "ambiguities": []
}
```

相同词语含义不同要拆分；来源没有定义时填入 `ambiguities`。保存为阶段4、类型 `concept_map`，随后交给03。

来源编号以运行时 `status` 返回的 sources 顺序为准。赞同数、评论数和排序分只用于理解社区语境，不作为概念真假的判据。
