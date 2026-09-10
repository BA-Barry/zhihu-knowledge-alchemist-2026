# 知乎技术知识炼金助手

> 当前状态：匿名 Demo、官方实时 API 与 12 个知识炼金 Skill 已可运行；官方 CLI 与 Access Secret 已完成真实验收。用户已选择接入 OAuth，Sealos 部署表单已准备，正等待确认创建公网资源及取得 App ID、App Key。

把知乎公开讨论转化为有来源边界的观点对照、知识简报、学习卡片和可验证行动路线。

本项目参加“知乎黑客松 2026 校园新锐季”的“知识炼金场”赛道。知乎官方搜索提供真实社区讨论，知乎直答完成证据有界的 AI 提炼。项目不依赖外部协作平台。

## 已实现

- 一个可点击的 Web 产品流程：输入问题，获得搜索来源与四类知识成果；
- 对接知乎开放平台 `zhihu_search`、`global_search`、`hot_list` 和 `chat/completions`；
- Access Secret 仅由服务端环境变量读取，请求携带官方要求的时间戳；
- 搜索、热榜和直答结果本地缓存，减少比赛配额消耗；
- 12 个知识炼金 Codex Skills；
- 原样内置官方 `zhihu-hackathon` Skill 及其 `zhihu` CLI Skill 0.2.1；
- 匿名 Demo、Markdown 导出、SQLite 存储、Windows 和 macOS 安装脚本；
- Docker 公网部署能力和自动化测试。

## 30 秒体验

Windows：

```powershell
powershell -ExecutionPolicy Bypass -File .\启动Demo-windows.ps1
```

macOS：

```bash
chmod +x ./启动Demo-mac.command
./启动Demo-mac.command
```

浏览器会打开本地产品页。点击“载入演示”无需密钥；配置 Access Secret 后可点击“开始炼金”运行官方实时流程。

## 实时模式

从 [知乎开发者平台](https://developer.zhihu.com/profile) 获取 Access Secret，然后运行安全启动脚本。脚本会隐藏输入，且不会把密钥保存到磁盘：

```powershell
powershell -ExecutionPolicy Bypass -File .\启动正式版-windows.ps1
```

密钥不要写入源码、截图、数据库或仓库。详细说明见 [使用说明.md](使用说明.md)、[docs/知乎API配置说明.md](docs/知乎API配置说明.md) 和 [docs/跨账号与换机指南.md](docs/跨账号与换机指南.md)。

## 比赛提交

必交项是公网体验链接与产品方案文档。推荐再提交公开代码仓库和演示视频。当前准备情况见 [docs/官方要求核对清单.md](docs/官方要求核对清单.md)。
