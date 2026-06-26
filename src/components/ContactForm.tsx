"use client";

import { useState, type FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  challenge: string;
  tools: string;
  message: string;
}

const projectTypes = [
  "QA Automation Framework",
  "API or Backend Testing",
  "AI QA or Agentic Testing",
  "Data Quality",
  "n8n Workflow Automation",
  "Low-Code or No-Code Automation",
  "Custom Automation Engineering",
  "CI/CD Integration",
  "Technical Collaboration",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    challenge: "",
    tools: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...form,
        }).toString(),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        company: "",
        projectType: "",
        challenge: "",
        tools: "",
        message: "",
      });
    } catch {
      setError("Failed to send message. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/20 p-8 text-center">
        <p className="font-mono text-sm text-emerald-400">Message received.</p>
        <p className="mt-2 text-xs text-zinc-500">
          Stagbyte will review and respond within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-netlify="true"
      name="contact"
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Name *
          </label>
          <input
            id="name"
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-800 focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Email *
          </label>
          <input
            id="email"
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-800 focus:outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="company" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Company
          </label>
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-800 focus:outline-none transition-colors"
            placeholder="Company name"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="projectType" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Project Type *
          </label>
          <select
            id="projectType"
            required
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            className="w-full rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 focus:border-cyan-800 focus:outline-none transition-colors"
          >
            <option value="">Select a type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="challenge" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          Current Challenge
        </label>
        <input
          id="challenge"
          type="text"
          value={form.challenge}
          onChange={(e) => setForm({ ...form, challenge: e.target.value })}
          className="w-full rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-800 focus:outline-none transition-colors"
          placeholder="What problem are you solving?"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="tools" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          Existing Tools
        </label>
        <input
          id="tools"
          type="text"
          value={form.tools}
          onChange={(e) => setForm({ ...form, tools: e.target.value })}
          className="w-full rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-800 focus:outline-none transition-colors"
          placeholder="What tools or frameworks are you using?"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-800 focus:outline-none transition-colors"
          placeholder="Describe the process, system, or quality problem..."
        />
      </div>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 disabled:opacity-50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-3 w-3" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
