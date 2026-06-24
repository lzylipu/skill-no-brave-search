# No Brave Search - OpenClaw Skill

**[English](./README.en.md) | [中文](./README.md)**

Force-disable Brave Search API — only allow Bing and Google for web searches.

## Why This Skill?

If you experience any of these:
- No Brave Search API key
- Every search attempt triggers Brave Search and errors out
- Don't want to use Brave Search at all
- Want full control over which search engine is used

This skill solves all of the above.

## Features

- **Complete Brave Search Disable**: Ensures the system never uses Brave Search
- **Multi-engine Support**: Bing, Google, DuckDuckGo available
- **No API Key Required**: All searches work without API keys
- **Time Filtering**: Filter results by time range
- **Auto-Redirect**: Detects Brave Search calls and redirects to Bing automatically

## Installation

### 1. Install to OpenClaw

```bash
cp -r no-brave-search /path/to/openclaw/skills/
```

### 2. Configure Default Engine (Optional)

```json
{
  "defaultEngine": "bing"  // Options: "bing", "google", "duckduckgo"
}
```

## Usage

### Method 1: In OpenClaw Chat

The skill automatically intercepts all search requests:

```
User: Search for latest AI developments
AI: [Using Bing search]
    Found the following results...
```

### Method 2: JavaScript API

```javascript
import NoBraveSearch from './search.js';

const searcher = new NoBraveSearch();

// Bing search (default)
const result = await searcher.search('latest AI developments');

// Google search
const googleResult = await searcher.search('AI news', 'google');

// DuckDuckGo (privacy-friendly)
const ddgResult = await searcher.search('AI news', 'duckduckgo');

// With time filter
const recentResult = await searcher.search('AI', 'bing', {
  timeFilter: 'week'
});
```

### Method 3: Direct URL Construction

```javascript
// Bing
const bingUrl = "https://www.bing.com/search?q=" + encodeURIComponent(query);

// Google
const googleUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);

// DuckDuckGo (no API key,不会被屏蔽)
const ddgUrl = "https://duckduckgo.com/html/?q=" + encodeURIComponent(query);
```

## Supported Search Engines

| Engine | Pros | Cons | Best For |
|--------|------|------|----------|
| **Bing** | Stable, good CJK support, no API limits | Mediocre result quality | Daily use (recommended) |
| **Google** | High quality, powerful | May be blocked, needs VPN | Professional searches |
| **DuckDuckGo** | Privacy-friendly, uncensorable | Mediocre result quality | Privacy, backup |

## Search Operator Support

### Bing Operators
```
site:example.com        # Limit to site
filetype:pdf           # File type
"exact phrase"         # Exact match
-exclude               # Exclude keyword
```

### Google Operators
```
site:example.com        # Limit to site
filetype:pdf           # File type
"exact phrase"         # Exact match
-exclude               # Exclude keyword
OR                     # OR logic
```

### DuckDuckGo Operators
```
site:example.com        # Limit to site
filetype:pdf           # File type
"exact phrase"         # Exact match
```

## Time Filtering

### Bing Time Filters
```javascript
url += "&filters=tm:1";   // Past 24 hours
url += "&filters=tm:7";   // Past week
url += "&filters=tm:30";  // Past month
```

### Google Time Filters
```javascript
url += "&tbs=qdr:h";     // Past hour
url += "&tbs=qdr:d";     // Past day
url += "&tbs=qdr:w";     // Past week
url += "&tbs=qdr:m";     // Past month
url += "&tbs=qdr:y";     // Past year
```

## How It Works

1. **Intercept**: Catches all web_search tool calls
2. **Verify**: Checks if it's a Brave Search call
3. **Redirect**: If Brave Search, auto-redirect to Bing
4. **Execute**: Runs search with the specified engine
5. **Return**: Returns search URL for web_fetch

## File Structure

```
no-brave-search/
├── SKILL.md      # Skill specification
├── README.md     # Chinese README
├── README.en.md  # English README
└── search.js     # Search redirect logic
```

## Notes

- This skill has the highest priority — the system will never fall back to Brave Search
- When adding new engines, ensure they aren't Brave Search proxies
- DuckDuckGo is a privacy-friendly alternative with no API rate limits

## License

MIT License
