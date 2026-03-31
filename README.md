# No Brave Search - OpenClaw Skill

强制禁用Brave Search API，只允许使用必应和谷歌进行网络搜索。

## 为什么需要这个技能？

如果你遇到以下问题：
- 没有Brave Search API密钥
- 每次搜索都会尝试调用Brave Search导致错误
- 不想使用Brave Search服务
- 想要完全控制使用的搜索引擎

这个技能就是为了解决这些问题而生。

## 功能特性

- **完全禁用Brave Search**: 确保系统永远不会尝试使用Brave Search
- **多搜索引擎支持**: 必应、谷歌、DuckDuckGo可选
- **无API密钥需求**: 所有搜索都不需要API密钥
- **时间过滤支持**: 支持按时间范围筛选搜索结果
- **自动重定向**: 如果检测到Brave Search调用，自动重定向到必应

## 安装

### 1. 安装到OpenClaw

```bash
cp -r no-brave-search /path/to/openclaw/skills/
```

### 2. 配置默认搜索引擎（可选）

在技能配置中设置默认引擎：

```json
{
  "defaultEngine": "bing"  // 可选: "bing", "google", "duckduckgo"
}
```

## 使用方法

### 方式1：在OpenClaw对话中

技能会自动拦截所有搜索请求，确保不会使用Brave Search：

```
用户: 搜索人工智能最新进展
AI: [使用必应搜索]
    找到以下结果...
```

### 方式2：使用JavaScript API

```javascript
import NoBraveSearch from './search.js';

const searcher = new NoBraveSearch();

// 使用必应搜索（默认）
const result = await searcher.search('人工智能最新进展');

// 使用谷歌搜索
const googleResult = await searcher.search('人工智能', 'google');

// 使用DuckDuckGo（隐私友好）
const ddgResult = await searcher.search('AI news', 'duckduckgo');

// 带时间过滤的搜索
const recentResult = await searcher.search('AI', 'bing', {
  timeFilter: 'week'  // 过去一周的结果
});
```

### 方式3：直接构造搜索URL

```javascript
// 必应搜索
const bingUrl = "https://www.bing.com/search?q=" + encodeURIComponent(query);

// 谷歌搜索
const googleUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);

// DuckDuckGo搜索（无需API密钥，不会被屏蔽）
const ddgUrl = "https://duckduckgo.com/html/?q=" + encodeURIComponent(query);

// 使用web_fetch获取结果
web_fetch({"url": bingUrl});
```

## 支持的搜索引擎

| 搜索引擎 | 优点 | 缺点 | 推荐场景 |
|---------|------|------|----------|
| **必应** | 稳定、支持中文好、无API限制 | 结果质量一般 | 日常搜索（推荐） |
| **谷歌** | 结果质量高、功能强大 | 可能被屏蔽、需要VPN | 专业搜索 |
| **DuckDuckGo** | 隐私友好、不会被屏蔽 | 结果质量一般 | 隐私搜索、备用 |

## 搜索操作符支持

### 必应操作符
```
site:example.com        # 限定网站搜索
filetype:pdf           # 特定文件类型
"exact phrase"         # 精确匹配
-exclude               # 排除关键词
```

### 谷歌操作符
```
site:example.com        # 限定网站搜索
filetype:pdf           # 特定文件类型
"exact phrase"         # 精确匹配
-exclude               # 排除关键词
OR                     # 或逻辑
```

### DuckDuckGo操作符
```
site:example.com        # 限定网站搜索
filetype:pdf           # 特定文件类型
"exact phrase"         # 精确匹配
```

## 时间过滤

### 必应时间过滤
```javascript
// 过去24小时
url += "&filters=tm:1";

// 过去一周
url += "&filters=tm:7";

// 过去一个月
url += "&filters=tm:30";
```

### 谷歌时间过滤
```javascript
// 过去小时
url += "&tbs=qdr:h";

// 过去天
url += "&tbs=qdr:d";

// 过去周
url += "&tbs=qdr:w";

// 过去月
url += "&tbs=qdr:m";

// 过去年
url += "&tbs=qdr:y";
```

## 工作原理

1. **拦截调用**: 拦截所有web_search工具调用
2. **验证来源**: 检查是否为Brave Search相关调用
3. **重定向**: 如果是Brave Search，自动重定向到必应
4. **执行搜索**: 使用指定的搜索引擎执行搜索
5. **返回结果**: 返回搜索URL供web_fetch使用

## 目录结构

```
no-brave-search/
├── SKILL.md      # 技能说明文档
├── README.md     # 本文件
└── search.js     # 搜索重定向逻辑
```

## 注意事项

- 此技能优先级最高，确保系统永远不会回退到Brave Search
- 如需添加其他搜索引擎，请确保它们不是Brave Search的变体或代理
- DuckDuckGo是隐私友好的替代方案，无需担心API限制

## 许可证

MIT License

## 作者

OpenClaw Community

## 相关链接

- [OpenClaw](https://github.com/openclaw/openclaw)
- [必应搜索](https://www.bing.com)
- [DuckDuckGo](https://duckduckgo.com)