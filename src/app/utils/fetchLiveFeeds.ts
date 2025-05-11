export async function fetchLiveFeeds() {
  try {
    const res = await fetch(
      'https://newsdata.io/api/1/news?apikey=pub_7990657d124bd3d232cd322d98d09b3f13734&language=en&category=business,education,science,technology'
    );

    if (!res.ok) throw new Error('API failed');

    const data = await res.json();

    const transformed = data.results.map((item: any) => ({
      title: item.title,
      url: item.link,
      description: item.description || item.content || 'No summary available.',
      source: item.source_id || 'Unknown',
    }));

    return transformed;
  } catch (err) {
    console.error('Failed to fetch live feeds:', err);
    return [];
  }
}
