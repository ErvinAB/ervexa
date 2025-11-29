"use client";

import { useState } from "react";
import { Send, Terminal, Loader2 } from "lucide-react";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert("Protocol Initiated. We will contact you shortly.");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="contact">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollAnimationWrapper variant="fade-in">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/50 text-cyan-400 font-mono text-xs tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              OPEN_FOR_PARTNERSHIP
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Initialize <span className="text-zinc-500">Sequence.</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Ready to deploy autonomous agents? Configure your request below.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper variant="scale-in" delay={0.2}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-1 backdrop-blur-sm">
            <div className="bg-black/80 rounded-lg border border-zinc-800/50 p-6 md:p-10">

              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-zinc-800/50 font-mono text-xs text-zinc-500">
                <Terminal className="w-4 h-4" />
                <span>root@stagbyte:~/contact-config</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-cyan-500 uppercase tracking-wider">var user_name =</label>
                    <input
                      type="text"
                      required
                      placeholder='"John Doe"'
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded p-3 text-white placeholder:text-zinc-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-cyan-500 uppercase tracking-wider">var user_email =</label>
                    <input
                      type="email"
                      required
                      placeholder='"john@company.com"'
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded p-3 text-white placeholder:text-zinc-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-cyan-500 uppercase tracking-wider">const project_scope =</label>
                  <textarea
                    required
                    rows={4}
                    placeholder='"Describe your automation needs..."'
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded p-3 text-white placeholder:text-zinc-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-cyan-400 hover:text-black font-bold py-4 rounded transition-all flex items-center justify-center gap-2 group mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> PROCESSING...
                    </>
                  ) : (
                    <>
                      EXECUTE_TRANSMISSION <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
