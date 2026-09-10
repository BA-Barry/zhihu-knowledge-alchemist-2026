# 知乎 OAuth 申请邮件模板

收件人：`product-platform@zhihu.com`

主题：`知乎技术知识炼金助手申请接入知乎 OAuth 服务`

正文：

```text
您好，我们正在开发“知乎技术知识炼金助手”，申请接入知乎 OAuth 服务。

应用名称：知乎技术知识炼金助手

应用简介：
将知乎问题、回答和外部证据转化为观点对照、知识简报、学习卡片与创新路线。核心匿名 Demo 无需登录；用户主动授权后，仅最小读取该账号的创作、关注与收藏，用于生成个人知识材料。

OAuth 回调地址：
https://pnnsklzkknse.sealoshzh.site/auth/callback

应用申请人名称：<请填写>
应用申请人手机号：<请填写>

烦请提供用于联调的 app_id 与 app_key，谢谢。
```

## 发送前检查

- 先完成公网部署，并把占位域名替换成真实 HTTPS 域名；
- 回调已按当前 Sealos 公网域名填写，必须以 `/auth/callback` 结尾；
- 不要把开放平台 Access Secret 写入邮件；
- 收到 App Key 后，不要粘贴到聊天、源码、截图或 Git；
- 若黑客松项目创建成功页已直接提供 App ID 与 App Key，则无需重复邮件申请。
