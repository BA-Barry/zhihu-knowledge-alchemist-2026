---
name: zhihu-knowledge-11-innovation-roadmap
description: 从知乎讨论中的未解决问题、观点冲突和证据缺口形成可验证的研究或产品创新路线；当用户希望把社区知识推进为实验、原型或后续探索任务时使用。不承诺创新性或商业价值。
---

# 创新路线

每条路线连接“观察到的缺口—可检验假设—最小原型或研究任务—评价指标”。区分来源提出的问题与模型生成的候选方向。

输出 JSON：

```json
{
  "opportunity_gaps": [{"gap": "", "source_basis": [], "confidence": ""}],
  "routes": [{"hypothesis": "", "minimum_test": "", "required_data": [], "metrics": [], "risks": []}],
  "recommended_sequence": [],
  "not_claimed": ["未完成真实用户验证", "未验证市场需求"]
}
```

保存为阶段11、类型 `innovation_roadmap`。候选方向必须给出最小验证任务，不把模型建议写成已经发生的产品效果。
