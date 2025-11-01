export default function Contact() {
    return (
      <section
        id="contact"
        className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
      >
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
            Let’s build.
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed">
  Whether you need an internal AI agent, an automated reporting flow, or just
  want to stop doing something manually every single day — tell me what hurts.
  I’ll map a fix.
</p>

  
          <p className="mt-3 text-[13px] text-zinc-500">
            Based in North Macedonia · Available for EU/remote work.
          </p>
        </div>
  
        <form
          className="mt-10 max-w-xl space-y-6"
          name="contact"
          method="POST"
          data-netlify="true"
        >
          {/* Netlify hidden input */}
          <input type="hidden" name="form-name" value="contact" />
  
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-xs font-medium text-zinc-300 mb-2"
              >
                Your name
              </label>
              <input
                id="name"
                name="name"
                required
                className="rounded-lg bg-zinc-900/60 border border-zinc-700/60 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                placeholder="Jane Doe"
              />
            </div>
  
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-xs font-medium text-zinc-300 mb-2"
              >
                Work email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="rounded-lg bg-zinc-900/60 border border-zinc-700/60 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                placeholder="you@company.com"
              />
            </div>
          </div>
  
          <div className="flex flex-col">
            <label
              htmlFor="company"
              className="text-xs font-medium text-zinc-300 mb-2"
            >
              Company / Team
            </label>
            <input
              id="company"
              name="company"
              className="rounded-lg bg-zinc-900/60 border border-zinc-700/60 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              placeholder="Acme Payments QA"
            />
          </div>
  
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-xs font-medium text-zinc-300 mb-2"
            >
              What do you need?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="rounded-lg bg-zinc-900/60 border border-zinc-700/60 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              placeholder="Example: We need a self-healing test suite for our React app. It's breaking every sprint and leadership is mad."
            />
          </div>
  
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white px-5 py-3 text-sm font-medium shadow-[0_20px_60px_-10px_rgba(0,122,255,0.6)]"
          >
            Send message
          </button>
  
          <p className="text-[11px] text-zinc-500">
            Or email directly:{" "}
            <span className="text-zinc-300">contact@ervexa.com</span>
          </p>
        </form>
      </section>
    );
  }
  