export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 border-t border-zinc-800 bg-black/60">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-white font-semibold text-lg">Stagbyte</div>
          <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-sm">
            AI agents and automation for real business workflows.
            We remove repetitive work, create audit trails, and surface the right
            info to the right person at the right time.
          </p>
          <p className="mt-4 text-[12px] text-zinc-600">
            Based in North Macedonia · Available EU/remote
          </p>
        </div>

        <div>
          <div className="text-zinc-200 text-sm font-medium">Sections</div>
          <ul className="mt-3 space-y-2 text-[13px] text-zinc-500">
            <li><a href="#services" className="hover:text-zinc-200">What we do</a></li>
            <li><a href="#use-cases" className="hover:text-zinc-200">Automations in production</a></li>
            <li><a href="#contact" className="hover:text-zinc-200">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-zinc-200 text-sm font-medium">Contact</div>
          <ul className="mt-3 space-y-2 text-[13px] text-zinc-500">
            <li className="text-zinc-300">contact@stagbyte.com</li>
            <li>
              <a
                className="hover:text-zinc-200"
                href="https://www.linkedin.com/company/stagbyte"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-[12px] text-zinc-600 text-center border-t border-zinc-800/60 pt-6">
        © 2025 Stagbyte. All rights reserved.
      </div>
    </footer>
  );
}
