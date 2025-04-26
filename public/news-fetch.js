fetch("/feed-data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("ai-feed");
    container.innerHTML = "";

    data.forEach((post, index) => {
      const card = document.createElement("article");
      card.className = `
        group bg-white dark:bg-[#0E0E0E] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 
        shadow-sm hover:shadow-md transition-transform transform hover:scale-[1.02] duration-300 flex flex-col text-left
      `;
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", index * 100);

      card.innerHTML = `
        <div class="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span class="px-3 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full font-medium">
            ${post.source}
          </span>
          <time datetime="${post.publishedAt}">
            ${new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          ${post.title}
        </h3>

        <p class="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          ${post.description || "No description available."}
        </p>

        <a href="${post.url}" target="_blank" class="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition">
          Read more
          <i data-lucide="external-link" class="w-4 h-4 ml-1"></i>
        </a>
      `;

      container.appendChild(card);
    });

    // Refresh Lucide icons after loading dynamic content
    if (window.lucide) {
      lucide.createIcons();
    }
  })
  .catch((err) => {
    console.error("Failed to load feed:", err);
  });
