// public/news-fetch.js

async function fetchNews() {
    const response = await fetch(
      'https://newsdata.io/api/1/news?apikey=pub_7990657d124bd3d232cd322d98d09b3f13734&category=technology&language=en&q=AI'
    );
    const data = await response.json();
    return data.results || [];
  }
  
  fetchNews().then(news => {
    const container = document.getElementById("ai-feed");
    news.forEach(article => {
      const card = document.createElement("div");
      card.className =
        "bg-white dark:bg-[#1E1E1E] rounded-xl p-6 shadow hover:shadow-xl transition";
      card.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
        <p class="text-sm text-gray-400 mb-3">${article.source_id || article.source}</p>
        <a href="${article.link}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline text-sm">
          Read more →
        </a>
      `;
      container.appendChild(card);
    });
  });
  