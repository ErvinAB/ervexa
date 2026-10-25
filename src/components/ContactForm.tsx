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
  "Hear about the first app",
  "Suggest a problem to solve",
  "Client project",
  "Prototype or MVP",
  "Ongoing partnership",
  "Game work",
  "Something else",
];

const emptyForm: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  challenge: "",
  tools: "",
  message: "",
};

const fieldClasses =
  "w-full rounded-none border border-charcoal/20 bg-ivory px-3 py-2.5 text-base text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none";
const labelClasses = "label font-semibold text-charcoal/70";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...form,
        }).toString(),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setForm(emptyForm);
    } catch {
      setError("Failed to send message. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-forest/30 bg-forest/5 p-10 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-forest">
          Message received
        </p>
        <p className="mt-3 text-base leading-relaxed text-charcoal/70">
          Thanks for getting in touch. We read everything and reply within 48
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} name="contact" className="space-y-5">
      <input type="hidden" name="form-name" value="contact" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClasses}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClasses}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={fieldClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={fieldClasses}
            placeholder="Company or studio name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="projectType" className={labelClasses}>
            I am writing about *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            className={fieldClasses}
          >
            <option value="">Select a topic</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="challenge" className={labelClasses}>
          What is it about?
        </label>
        <input
          id="challenge"
          name="challenge"
          type="text"
          value={form.challenge}
          onChange={(e) => setForm({ ...form, challenge: e.target.value })}
          className={fieldClasses}
          placeholder="An app idea, a problem, or a project"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tools" className={labelClasses}>
          Platforms or tech in mind
        </label>
        <input
          id="tools"
          name="tools"
          type="text"
          value={form.tools}
          onChange={(e) => setForm({ ...form, tools: e.target.value })}
          className={fieldClasses}
          placeholder="iOS, Android, desktop, web, React Native"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={labelClasses}>
          Tell us more *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${fieldClasses} resize-none`}
          placeholder="What should it do, who is it for, and when does it need to exist?"
        />
      </div>

      {error && <p className="text-base text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-ivory transition-colors hover:bg-charcoal active:bg-charcoal disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}
