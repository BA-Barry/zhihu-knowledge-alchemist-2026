---
name: zhihu-knowledge-05-evidence-research
description: 围绕知乎项目概念图中的关键可验证主张检索外部权威证据；当回答之间存在技术争议、时效性事实或需要补充来源时使用。输出证据表和未解决项，不替来源提高证据等级。
---

# 外部证据检索

优先用知乎官方 `global_search --query "检索词"` 补充全网材料，再核验标准、政府或高校资料、研究论文、官方技术文档等一手来源。相同检索词优先使用本地缓存。每项证据记录：标题、机构或作者、日期、链接、支持或反驳的主张、适用条件和局限。

输出 JSON：

```json
{
  "queries": [],
  "evidence": [{"claim": "", "relation": "supports|contradicts|context", "source": {}, "limitations": ""}],
  "unresolved": []
}
```

观点热度、点赞量和作者自信程度不是技术证据。搜索摘要只能用于发现来源；无法打开或无法核验的材料不得写成已核实。保存为阶段5、类型 `evidence_research`。
