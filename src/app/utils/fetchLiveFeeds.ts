export type FeedPost = {
  title: string;
  url: string;
  description: string;
  source: string;
};

type NewsdataItem = {
  title: string;
  link: string;
  description?: string;
  content?: string;
  source_id?: string;
};

export async function fetchLiveFeeds(): Promise<FeedPost[]> {
  try {
    const res = await fetch(
      'https://newsdata.io/api/1/news?apikey=pub_7990657d124bd3d232cd322d98d09b3f13734&language=en&category=business,education,science,technology'
    );

    if (!res.ok) throw new Error('API failed');

    const data = await res.json();

    return data.results.map((item: NewsdataItem) => ({
      title: item.title,
      url: item.link,
      description: item.description || item.content || 'No summary available.',
      source: item.source_id || 'Unknown',
    }));
  } catch (err) {
    console.error('Failed to fetch live feeds:', err);
    return [];
  }
}
