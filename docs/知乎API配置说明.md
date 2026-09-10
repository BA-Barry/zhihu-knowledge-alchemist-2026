# 知乎开放平台配置说明

## 唯一必填项

从 [知乎开发者平台个人页](https://developer.zhihu.com/profile) 获取 Access Secret，并设置为服务端环境变量 `ZHIHU_ACCESS_SECRET`。

本地使用推荐直接运行 `启动正式版-windows.ps1` 或 `启动正式版-mac.command`。脚本采用隐藏输入，不保存密钥。下面的环境变量命令仅用于手动联调。

Windows 临时配置：

```powershell
$env:ZHIHU_ACCESS_SECRET="你的Access Secret"
```

macOS 或 Linux 临时配置：

```bash
export ZHIHU_ACCESS_SECRET='你的Access Secret'
```

官方基础地址为 `https://developer.zhihu.com`。通常无需设置 `ZHIHU_API_BASE_URL`。

## 已接入能力

| 能力 | 官方端点 | 本项目命令 | 单次上限 |
|---|---|---|---|
| 知乎搜索 | `GET /api/v1/content/zhihu_search` | `search-zhihu` | 10 |
| 全网搜索 | `GET /api/v1/content/global_search` | `search-global` | 20 |
| 热榜 | `GET /api/v1/content/hot_list` | `hot` | 30 |
| 知乎直答 | `POST /v1/chat/completions` | `alchemize` 内部调用 | 以平台限制为准 |

每次请求都会携带 `Authorization: Bearer ...` 和 Unix 秒级 `X-Request-Timestamp`。页面 JavaScript 不接触 Access Secret。

## 配额缓存与软限额

- 知乎搜索和全网搜索：24 小时；
- 知乎直答：相同输入 24 小时；
- 热榜：5 分钟。

只有明确需要最新结果时才使用 `--refresh`。缓存只保存官方响应，不保存密钥。官方文档不同位置展示的搜索日配额可能不同，应以开发者平台实际提示与接口返回为准。

公开体验还会对真实外部调用执行本地日软限额，默认直答和热榜各 80 次、两种搜索各 800 次；缓存命中不计数。这样能避免匿名访问耗尽官方额度，并为现场演示保留余量。可通过 `ZHIHU_DAILY_LIMIT_*` 环境变量调整，但不能突破知乎账号的实际额度。

## 联调命令

```powershell
python .\runtime\zhihu_knowledge.py search-zhihu --project-key TEST --query "人工智能学习路线" --count 3
python .\runtime\zhihu_knowledge.py alchemize --project-key TEST --query "人工智能学习路线" --count 6
```

若返回 401 或 403，检查 Access Secret、账号资格与系统时间；若返回配额错误，保留缓存并等待官方额度恢复，不要改用网页抓取。
