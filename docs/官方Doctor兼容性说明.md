# 官方 doctor 兼容性说明

## 当前结果

执行：

```powershell
node .\.codex\skills\zhihu-hackathon\scripts\doctor.mjs --project-dir .
```

官方 doctor 返回：

```json
{"ok":false,"ready":false,"error":"ENOENT: no such file or directory, open '<project>/hackathon.config.json'"}
```

## 原因

官方 doctor 面向该 Skill 生成的 Node Hello World 模板，固定检查：

- `hackathon.config.json`；
- 根目录 `server.mjs`；
- 根目录 `public/index.html` 和 `public/styles.css`；
- 官方 CLI 是否安装；
- OAuth 分支的 `public/app.js`、`lib/oauth.mjs` 和凭证边界。

本项目是已经存在的 Python Web 产品，入口和静态目录结构不同，因此不能用该 doctor 的 `ready` 结果替代本项目自己的运行测试。

## 处理原则

不会为了让 doctor 变绿而添加无功能的空配置、伪 `server.mjs` 或重复静态页面。那只能满足文件存在检查，不能证明作品符合官方流程。

参赛者已明确启用 OAuth。正确处理方式是取得 App ID 后，用官方 Skill 在独立空目录生成 OAuth 模板，把现有搜索、缓存、知识炼金、界面和导出能力迁移进去，然后运行：

1. 官方 doctor；
2. `npm test`；
3. `npm run check`；
4. `npm start`；
5. `/api/health`；
6. OAuth 分支额外检查 `/api/oauth/status` 和公网回调。

在上述迁移完成前，当前 Python 版仍可作为已通过 6 项自动测试和 Docker 验收的功能原型，但不能声称“官方 doctor 已通过”。
