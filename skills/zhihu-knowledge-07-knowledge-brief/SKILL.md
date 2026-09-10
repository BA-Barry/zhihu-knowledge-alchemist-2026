---
name: zhihu-knowledge-07-knowledge-brief
description: 将知乎问题、观点矩阵和外部证据整理成分层知识简报；当用户需要快速理解问题、形成判断或获得进一步阅读路径时使用。面向普通读者表达，并保留争议与证据局限。
---

# 知识简报

简报先回答“目前能确定什么”，再说明分歧、条件和未知。避免把点赞量当可信度，也不要用专业术语堆叠掩盖证据不足。

输出 JSON：

```json
{
  "one_sentence": "",
  "what_we_know": [],
  "how_it_works": [],
  "tradeoffs": [],
  "open_questions": [],
  "recommended_reading": [{"title": "", "url": "", "why": ""}]
}
```

每个确定性结论应能追溯到项目来源或阶段5证据。快速模式可由知乎直答生成初稿，但仍要检查输出 JSON、来源编号和未知项；格式修复不得改变原结论。保存为阶段7、类型 `knowledge_brief`。
