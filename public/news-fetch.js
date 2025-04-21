// news-fetch.js
fetch("https://ervexa.netlify.app/feed-data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("ai-feed");
    container.innerHTML = ""; // Clear first

    data.forEach((post, index) => {
      const card = document.createElement("div");
      card.className =
        "bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300";

      card.innerHTML = `
        <div class="flex justify-between items-center mb-3 text-xs text-gray-400 dark:text-gray-500">
          <span class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">${post.source}</span>
          <span>${new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${post.title}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">${post.description || ''}</p>
        <a href="${post.url}" target="_blank" class="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Read more →</a>
      `;

      container.appendChild(card);
    });
  });
