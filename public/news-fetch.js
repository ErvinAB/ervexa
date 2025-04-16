// public/news-fetch.js
const container = document.getElementById("ai-feed");
const API_KEY = "pub_7990657d124bd3d232cd322d98d09b3f13734"; // Use your actual key

fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=ai&language=en&category=technology`)
  .then(res => res.json())
  .then(data => {
    data.results?.forEach((post, i) => {
      const card = document.createElement("div");
      card.className = "bg-white dark:bg-[#1E1E1E] rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", i * 100);

      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${post.source_id || 'AI Feed'}</span>
          <span class="text-xs text-gray-400">${new Date(post.pubDate).toLocaleDateString()}</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">${post.title}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-300 mb-3">${post.description || ''}</p>
        <a href="${post.link}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">Read more →</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to fetch live news:", err);
  });
