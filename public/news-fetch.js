fetch("https://ervexa.netlify.app/feed-data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("ai-feed");
    container.innerHTML = "";

    data.forEach((post, index) => {
      const card = document.createElement("article");
      card.className = `
        group bg-white dark:bg-[#0E0E0E] border border-gray-200 dark:border-gray-800 
        rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-600 
        dark:hover:border-blue-400 transition-all duration-300 ease-in-out 
        flex flex-col justify-between text-left space-y-4
      `;

      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", index * 100);

      card.innerHTML = `
        <header class="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
          <span class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full font-medium tracking-tight">
            ${post.source}
          </span>
          <time datetime="${post.publishedAt}">
            ${new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </header>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            ${post.title}
          </h3>

          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            ${post.description || "No description available."}
          </p>
        </div>

        <a href="${post.url}" target="_blank"
          class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition">
          Read full article <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
      `;

      container.appendChild(card);
    });

    // Important: create lucide icons after injection
    if (window.lucide) {
      lucide.createIcons();
    }
  });
