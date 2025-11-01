export default function Footer() {
    return (
      <footer className="w-full bg-black text-white py-10 px-6 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2 text-white">
  <img src="/logo.svg" alt="Ervexa Logo" className="h-6 w-auto" />
  <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Ervexa</span>
</div>
          <div className="flex gap-4">
          <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-sm">
  AI agents and automation for real business workflows.
  We remove repetitive work, create audit trails, and surface the right info to the right person.
</p>

            <a href="https://github.com/ErvinAB/ervexa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  