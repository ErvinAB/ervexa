import { NextResponse } from "next/server";

interface RawNewsItem {
  title?: string;
  source_id?: string;
  link?: string;
  pubDate?: string;
}

interface NormalizedNewsItem {
  title: string;
  source: string;
  url: string;
  published: string;
}

// call external API for AI / automation / ML news
async function fetchNews(): Promise<NormalizedNewsItem[]> {
  try {
    const resp = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=artificial%20intelligence,automation,ml&language=en&country=us,gb,de`,
      {
        cache: "no-store",
      }
    );

    if (!resp.ok) {
      console.error("News fetch failed:", resp.status);
      return [];
    }

    const data = await resp.json();

    const results: RawNewsItem[] = Array.isArray(data.results)
      ? data.results
      : [];

    const items: NormalizedNewsItem[] = results.slice(0, 6).map(
      (item: RawNewsItem): NormalizedNewsItem => ({
        title: item.title ?? "Untitled",
        source: item.source_id ?? "Unknown",
        url: item.link ?? "#",
        published: item.pubDate ?? new Date().toISOString(),
      })
    );

    return items;
  } catch (err) {
    console.error("News fetch error:", err);
    return [];
  }
}

export async function GET() {
  const news = await fetchNews();
  return NextResponse.json({ news });
}
