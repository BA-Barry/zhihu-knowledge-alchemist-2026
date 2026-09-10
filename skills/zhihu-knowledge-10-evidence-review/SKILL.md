---
name: zhihu-knowledge-10-evidence-review
description: 复核知乎知识项目的来源映射、证据强度、冲突、时效性和过度推断；当简报、卡片或图谱形成后需要质量审查时使用。输出问题与修订建议，不因普通缺口阻止继续探索。
---

# 证据一致性复核

抽查每个重要结论是否能回到来源；检查二手陈述被写成一手事实、相关性被写成因果、适用条件丢失、旧资料被当作当前状态等问题。

输出 JSON：

```json
{
  "reviewed_artifacts": [],
  "supported": [],
  "issues": [{"severity": "high|medium|low", "claim": "", "problem": "", "recommended_revision": ""}],
  "missing_evidence": [],
  "reader_caveats": []
}
```

同时检查官方搜索摘要是否被错误扩写、直答 JSON 是否缺字段、来源编号是否越界。只有准备公开发布且存在会显著误导读者的高严重度问题时，才建议先修订；普通研究缺口保留为限制。保存为阶段10、类型 `evidence_review`。
