# 交付清单

## 产品

- `skills/`：12 个知乎知识生产 Skills；
- `.codex/skills/zhihu-hackathon/`：原样的官方黑客松 Skill；
- `.codex/skills/zhihu/`：原样的官方 CLI Skill 0.2.1；
- `runtime/zhihu_knowledge.py`：官方 API、缓存、数据与 Web 运行时；
- `runtime/web/`：可交互产品页；
- `demo/`：匿名素材与样例成果；
- `assets/`：项目广场封面规格，正式图片待生成；
- `tests/`：自动化测试；
- `Dockerfile`：公网部署入口；
- `install-windows.ps1`、`install-mac.command`：安装脚本；
- `启动Demo-windows.ps1`、`启动Demo-mac.command`：Demo 脚本。
- `启动正式版-windows.ps1`、`启动正式版-mac.command`：隐藏输入 Access Secret 的实时模式脚本。

## 说明

- `README.md`：产品概览；
- `使用说明.md`：完整安装与使用步骤；
- `docs/知乎API配置说明.md`：需要填写的接口配置；
- `docs/产品方案书.md`：官方必交的产品方案；
- `docs/200-500字项目介绍.md`：投稿简介；
- `docs/公网部署指南.md`：公网运行说明；
- `docs/官方要求核对清单.md`：赛前逐项核对；
- `docs/官方Skill来源与校验.md`：官方 Skill 来源与完整性；
- `docs/官方Doctor兼容性说明.md`：官方模板检查与迁移边界；
- `docs/开发日志模板.md`：独立开发证据记录；
- `docs/需要填写的信息.md`：参赛者必须补充的信息；
- `docs/三分钟Demo脚本.md`：推荐录制脚本；
- `docs/比赛适配说明.md`：赛道与产品匹配关系；
- `docs/比赛投稿填写模板.md`：可复制投稿文案；
- `docs/技术架构.md`：组件和数据边界。

## 验证记录

- 12/12 Skills 通过 `quick_validate.py`；
- 外层官方 Skill 28 个文件、内层官方 Skill 12 个文件均比对无差异；
- 匿名 Demo 成功导入 5 条来源和 4 项样例成果；
- SQLite、鉴权请求、业务错误、缓存、软限额、结构化炼金、Web API 共 6 项自动测试通过；
- Windows PowerShell 5.1 与 macOS shell 脚本语法检查通过；
- 外部协作平台依赖扫描为0；
- 真实凭据扫描为0。

仍需参赛者完成：Access Secret 真实联调、公网部署、OAuth 选择与真实用户效果测量。
