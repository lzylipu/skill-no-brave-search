---
name: no-brave-search
description: "Disable Brave Search - enforce Bing/Google/DuckDuckGo only (Hermes has native web search, this is OpenClaw legacy)"
version: 1.0.0
author: lzylipu
license: MIT
platforms: [linux]
status: legacy
note: "Hermes Agent has built-in web search, this skill was for OpenClaw only"
prerequisites: {}
metadata:
  hermes:
    tags: [brave, search, bing, google, duckduckgo, 搜索]
    related_skills: []
    homepage: https://github.com/lzylipu/openclaw-skill-no-brave-search
    category: personal
    skill_type: constraint
---

> **Note**: This skill was designed for OpenClaw. Hermes Agent has built-in web search via `web_search` tool and does not need this.

# No Brave Search Skill v1.0.0

**强制禁用Brave Search，只使用必应和谷歌搜索**

## 目的
- 完全禁用Brave Search API调用
- 确保所有网络搜索请求都通过必应或谷歌进行
- 避免任何Brave Search相关的错误或API密钥需求

## 实现方式
此技能通过以下方式工作：
1. **工具重定向**：拦截所有web_search调用并重定向到必应/谷歌
2. **配置覆盖**：确保系统配置中Brave Search始终被禁用
3. **备用搜索**：提供直接的必应/谷歌搜索函数

## 使用方法

### 1. 必应搜索（推荐）
```javascript
// 使用必应搜索
web_fetch({"url": "https://www.bing.com/search?q=" + encodeURIComponent(query)})
```

### 2. 谷歌搜索
```javascript
// 使用谷歌搜索  
web_fetch({"url": "https://www.google.com/search?q=" + encodeURIComponent(query)})
```

### 3. DuckDuckGo（隐私友好替代）
```javascript
// 使用DuckDuckGo（无需担心被屏蔽）
web_fetch({"url": "https://duckduckgo.com/html/?q=" + encodeURIComponent(query)})
```

## 搜索操作符支持

### 必应支持的操作符：
- `site:example.com` - 限定网站搜索
- `filetype:pdf` - 特定文件类型
- `"exact phrase"` - 精确匹配
- `-exclude` - 排除关键词

### 谷歌支持的操作符：
- `site:example.com` - 限定网站搜索  
- `filetype:pdf` - 特定文件类型
- `"exact phrase"` - 精确匹配
- `-exclude` - 排除关键词
- `OR` - 或逻辑

## 时间过滤器

### 必应时间过滤：
- 过去24小时：`&filters=tm:1`
- 过去一周：`&filters=tm:7`  
- 过去一个月：`&filters=tm:30`

### 谷歌时间过滤：
- 过去小时：`&tbs=qdr:h`
- 过去天：`&tbs=qdr:d`
- 过去周：`&tbs=qdr:w`
- 过去月：`&tbs=qdr:m`
- 过去年：`&tbs=qdr:y`

## 错误处理
如果直接调用web_search工具，会自动返回错误提示，引导用户使用本技能提供的搜索方法。

## 安全保证
- **零Brave依赖**：完全不包含任何Brave Search相关代码
- **无API密钥需求**：所有搜索都不需要API密钥
- **成本控制**：避免产生任何Brave Search相关的费用

## 示例用法

```javascript
// 搜索"人工智能最新进展"
const query = "人工智能最新进展";
const bingUrl = "https://www.bing.com/search?q=" + encodeURIComponent(query);
web_fetch({"url": bingUrl});
```

```javascript
// 搜索特定网站的内容
const siteQuery = "site:github.com react hooks";
const googleUrl = "https://www.google.com/search?q=" + encodeURIComponent(siteQuery);
web_fetch({"url": googleUrl});
```

## 维护说明
此技能优先级最高，确保系统永远不会回退到Brave Search。如需添加其他搜索引擎，请确保它们不是Brave Search的变体或代理。