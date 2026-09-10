---
name: zhihu-knowledge-09-knowledge-graph
description: 把知乎项目中的概念、观点、证据、条件和未解决问题表示为可视化知识图谱数据；当用户需要查看关系网络、探索路径或导出图谱时使用。节点和边必须对应已有来源或明确标为模型归纳。
---

# 知识图谱

使用稳定的项目内节点 ID，不以作者人气决定中心性。边类型优先使用 `supports`、`contradicts`、`depends_on`、`applies_when`、`raises` 和 `explains`。

输出 JSON：

```json
{
  "nodes": [{"id": "", "type": "question|concept|claim|evidence|condition|gap", "label": "", "source_ids": []}],
  "edges": [{"from": "", "to": "", "relation": "", "note": ""}],
  "suggested_entry_nodes": []
}
```

不要为追求图形丰富而增加无实质含义的节点。快速模式未生成图谱时不得以观点卡片冒充图谱；完整模式保存为阶段9、类型 `knowledge_graph`。
