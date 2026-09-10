---
name: zhihu-knowledge-06-viewpoint-synthesis
description: 比较知乎回答及外部证据中的共识、分歧、适用条件和盲点；当项目已有概念图并需要形成多观点对照时使用。保留少数观点，不用单一结论抹平真实争议。
---

# 多观点综合

以“问题维度”而不是“作者排名”组织比较。对每个观点标明对应来源 ID、成立条件、外部证据关系和仍缺少的信息。

输出 JSON：

```json
{
  "consensus": [{"statement": "", "source_ids": []}],
  "differences": [{"dimension": "", "positions": [{"position": "", "source_ids": [], "conditions": ""}]}],
  "evidence_conflicts": [],
  "blind_spots": [],
  "unresolved": []
}
```

不要把多个回答的片段拼成任何单一作者的原话。来源引用使用项目内编号；官方搜索返回的赞同和排序信息只作语境，不作证据权重。保存为阶段6、类型 `viewpoint_matrix`。
