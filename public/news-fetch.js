fetch("https://ervexa.netlify.app/feed-data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("ai-feed");
    container.innerHTML = "";

    data.forEach((post, index) => {
      const card = document.createElement("article");
      card.className = `
        group bg-white dark:bg-[#0E0E0E] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm 
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left
      `;

      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", index * 100);

      card.innerHTML = `
        <header class="flex justify-between items-center text-xs mb-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            ${post.source}
          </span>
          <time class="text-gray-400 dark:text-gray-500" datetime="${post.publishedAt}">
            ${new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </header>

        <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2">
          ${post.title}
        </h3>

        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          ${post.description || "No description available."}
        </p>

        <a href="${post.url}" target="_blank" class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition">
          Read full article <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
      `;

      container.appendChild(card);
    });

    // Initialize Lucide icons after rendering
    if (window.lucide) lucide.createIcons();
  });
