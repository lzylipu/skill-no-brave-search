/**
 * No Brave Search - 强制使用必应/谷歌搜索
 * 此脚本确保永远不会调用Brave Search API
 */

class NoBraveSearch {
  constructor() {
    this.defaultEngine = 'bing'; // 默认使用必应
  }

  /**
   * 执行搜索 - 只使用必应或谷歌
   * @param {string} query - 搜索关键词
   * @param {string} engine - 搜索引擎 ('bing', 'google', 'duckduckgo')
   * @param {object} options - 额外选项
   * @returns {Promise} 搜索结果
   */
  async search(query, engine = this.defaultEngine, options = {}) {
    // 确保不使用brave
    if (engine.toLowerCase().includes('brave')) {
      console.warn('Brave Search is disabled. Using Bing instead.');
      engine = 'bing';
    }

    const encodedQuery = encodeURIComponent(query);
    let url;

    switch (engine.toLowerCase()) {
      case 'bing':
        url = `https://www.bing.com/search?q=${encodedQuery}`;
        if (options.timeFilter) {
          url += this.getBingTimeFilter(options.timeFilter);
        }
        break;
      case 'google':
        url = `https://www.google.com/search?q=${encodedQuery}`;
        if (options.timeFilter) {
          url += this.getGoogleTimeFilter(options.timeFilter);
        }
        break;
      case 'duckduckgo':
      default:
        url = `https://duckduckgo.com/html/?q=${encodedQuery}`;
        break;
    }

    // 这里应该调用 web_fetch 工具
    // 但由于我们是在技能描述中，实际调用会在主程序中处理
    return {
      url: url,
      engine: engine,
      query: query,
      method: 'web_fetch'
    };
  }

  getBingTimeFilter(timeFilter) {
    const filters = {
      'hour': '&filters=tm:1',
      'day': '&filters=tm:1', 
      'week': '&filters=tm:7',
      'month': '&filters=tm:30',
      'year': '&filters=tm:365'
    };
    return filters[timeFilter] || '';
  }

  getGoogleTimeFilter(timeFilter) {
    const filters = {
      'hour': '&tbs=qdr:h',
      'day': '&tbs=qdr:d',
      'week': '&tbs=qdr:w', 
      'month': '&tbs=qdr:m',
      'year': '&tbs=qdr:y'
    };
    return filters[timeFilter] || '';
  }

  /**
   * 验证是否为Brave相关调用
   * @param {string} source - 调用源
   * @returns {boolean} 是否包含Brave
   */
  isBraveRelated(source) {
    const braveKeywords = ['brave', 'bravesearch', 'brave-search'];
    return braveKeywords.some(keyword => 
      source.toLowerCase().includes(keyword)
    );
  }
}

// 导出实例
const noBraveSearch = new NoBraveSearch();
export default noBraveSearch;