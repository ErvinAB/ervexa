"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-black dark:text-white tracking-tight">ervexa</div>
        <div className="flex items-center gap-6">
          <a href="#live-ai" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm">AI Feeds</a>
          <a href="#ai-use-cases" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm">Use Cases</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm">Contact</a>
          
        </div>
      </div>
    </nav>
  );
}
