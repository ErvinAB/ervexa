export type FeedPost = {
  title: string;
  url: string;
  description: string;
  source: string;
  pubDate: string;
};

type NewsdataItem = {
  title: string;
  link: string;
  description?: string;
  content?: string;
  source_id?: string;
  pubDate?: string;
};

export async function fetchLiveFeeds(): Promise<FeedPost[]> {
  try {
    const res = await fetch(
      'https://newsdata.io/api/1/news?apikey=pub_aedaad6af0054d59ac4905d5deb5ec61&language=en&category=technology,science&q=artificial%20intelligence'
    );

    if (!res.ok) throw new Error('API failed');

    const data = await res.json();

    return data.results.map((item: NewsdataItem) => ({
      title: item.title,
      url: item.link,
      description: item.description || item.content || 'No summary available.',
      source: item.source_id || 'Unknown',
      pubDate: item.pubDate || 'Just now',
    }));
  } catch (err) {
    console.error('Failed to fetch live feeds:', err);
    return [];
  }
}
