---
name: zhihu-knowledge-02-content-intake
description: 将知乎问题、回答、话题材料或匿名问答数据采集到本地知识项目；当项目尚无来源数据、用户给出知乎问题链接或要求导入比赛官方 API 内容时使用。只使用获准的官方接口或用户提供内容，不负责观点结论。
---

# 知乎内容采集

目标是建立可追踪的来源集合，而不是提前总结。

## 输入方式

- 官方实时搜索：服务端配置 `ZHIHU_ACCESS_SECRET` 后执行 `search-zhihu --query "主题" --count 8`。对应官方 `GET /api/v1/content/zhihu_search`，单次最多10条。
- 匿名演示：执行 `demo` 或 `import-fixture`。
- 用户提供文本：整理为与 fixture 相同的 question/answers JSON 后导入。

官方请求必须同时携带 Bearer Access Secret 和 Unix 秒级 `X-Request-Timestamp`。保留 ContentID、ContentType、AuthorName、Url、ContentText、赞同、评论、编辑时间和排序线索；不要保存 Access Secret 或登录态。

相同查询优先读取24小时本地缓存，避免耗尽比赛接口配额。只有用户明确要求实时刷新时才使用 `--refresh`。完成后用 `status` 确认来源非空，再交给03；字段异常时报告原接口能力和缺失字段，不猜造数据。
