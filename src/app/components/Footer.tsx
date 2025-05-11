export default function Footer() {
    return (
      <footer className="w-full bg-black text-white py-10 px-6 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Ervexa. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/ErvinAB/ervexa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  