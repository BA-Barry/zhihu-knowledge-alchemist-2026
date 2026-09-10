---
name: zhihu-knowledge-08-learning-cards
description: 根据知乎知识简报生成可复习的概念卡、判断卡和情境问答；当用户需要把阅读内容转化为学习材料或互动问答时使用。题目必须能由项目证据回答，不制造虚假确定性。
---

# 学习卡片与互动问答

优先覆盖核心概念、常见误解、适用条件和关键权衡。答案简短，但保留必要限定；有争议的问题应要求比较观点，而不是设置唯一正确答案。

输出 JSON：

```json
{
  "cards": [{"kind": "concept|judgment|scenario", "question": "", "answer": "", "source_ids": [], "difficulty": "basic|advanced"}],
  "quiz": [{"prompt": "", "expected_points": [], "explanation": ""}]
}
```

每张卡必须填写来源编号；找不到依据的卡片删除或改写为开放问题。保存为阶段8、类型 `learning_cards`。
