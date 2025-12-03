import * as cheerio from 'cheerio';

export interface CompanyAnalysis {
    url: string;
    name: string;
    description: string;
    mainContent: string;
}

export async function analyzeCompany(url: string): Promise<CompanyAnalysis> {
    try {
        // Ensure URL has protocol
        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${targetUrl}: ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and other non-content elements
        $('script, style, nav, footer, iframe, svg').remove();

        const name = $('meta[property="og:site_name"]').attr('content') ||
            $('title').text().split('|')[0].trim() ||
            new URL(targetUrl).hostname;

        const description = $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') ||
            '';

        // Get main text content
        const mainContent = $('body').text()
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 5000); // Limit context window

        return {
            url: targetUrl,
            name,
            description,
            mainContent
        };

    } catch (error) {
        console.error('Error analyzing company:', error);
        throw new Error(`Failed to analyze company: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
