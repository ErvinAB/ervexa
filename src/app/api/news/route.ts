import { NextResponse } from "next/server";

// We'll fetch from Newsdata.io (or similar). Put your API key in Netlify env: NEWSDATA_API_KEY
async function fetchNews() {
  try {
    const resp = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=artificial%20intelligence,automation,ml&language=en&country=us,gb,de`,
      { cache: "no-store" }
    );

    if (!resp.ok) {
      console.error("News fetch failed:", resp.status);
      return [];
    }

    const data = await resp.json();

    // normalize to the fields we want
    const items = (data.results || []).slice(0, 6).map((item: any) => ({
      title: item.title ?? "Untitled",
      source: item.source_id ?? "Unknown",
      url: item.link ?? "#",
      published: item.pubDate ?? new Date().toISOString(),
    }));

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
