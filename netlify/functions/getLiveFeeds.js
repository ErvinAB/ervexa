const Parser = require("rss-parser");
const parser = new Parser();

exports.handler = async function () {
  try {
    const techCrunch = await parser.parseURL("https://techcrunch.com/tag/artificial-intelligence/feed/");
    const ventureBeat = await parser.parseURL("https://venturebeat.com/category/ai/feed/");
    const analyticsVidhya = await parser.parseURL("https://www.analyticsvidhya.com/blog/feed/");
    const hackerNews = await parser.parseURL("https://hnrss.org/newest?q=ai");
    const mediumAI = await parser.parseURL("https://medium.com/feed/tag/ai");

    const allFeeds = [
      ...techCrunch.items.slice(0, 3).map(item => ({ title: item.title, url: item.link, source: "TechCrunch" })),
      ...ventureBeat.items.slice(0, 3).map(item => ({ title: item.title, url: item.link, source: "VentureBeat" })),
      ...analyticsVidhya.items.slice(0, 3).map(item => ({ title: item.title, url: item.link, source: "Analytics Vidhya" })),
      ...hackerNews.items.slice(0, 3).map(item => ({ title: item.title, url: item.link, source: "Hacker News" })),
      ...mediumAI.items.slice(0, 3).map(item => ({ title: item.title, url: item.link, source: "Medium AI" })),
    ];

    return {
      statusCode: 200,
      body: JSON.stringify(allFeeds),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch feeds", details: error.message }),
    };
  }
};
