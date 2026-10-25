"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  /** "night" on the dark bands, "paper" on ivory surfaces. */
  tone?: "night" | "paper";
  className?: string;
}

/**
 * One field, one promise. Posts to the Netlify Forms "newsletter" form
 * (declared in public/__forms.html) so this needs no extra service for v1.
 */
export default function NewsletterForm({
  tone = "night",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const isNight = tone === "night";

  const inputClasses = isNight
    ? "w-full rounded-full border border-ivory/30 bg-transparent px-3 py-2.5 text-base text-ivory placeholder:text-ivory/50 transition-colors focus:border-accent focus:outline-none"
    : "w-full rounded-full border border-charcoal/25 bg-ivory px-3 py-2.5 text-base text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none";

  const buttonClasses = isNight
    ? "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-base font-semibold text-night transition-colors hover:bg-ivory active:bg-ivory disabled:opacity-50"
    : "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-5 py-2.5 text-base font-semibold text-ivory transition-colors hover:bg-charcoal active:bg-charcoal disabled:opacity-50";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "newsletter",
          email,
        }).toString(),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setDone(true);
      setEmail("");
    } catch {
      setError("Could not save that. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <p
        className={`text-base leading-relaxed ${
          isNight ? "text-ivory/85" : "text-charcoal/80"
        } ${className}`}
      >
        Thanks — we will write once, when there is something real to try.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="newsletter"
      className={className}
    >
      <input type="hidden" name="form-name" value="newsletter" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          placeholder="you@example.com"
        />
        <button type="submit" disabled={submitting} className={buttonClasses}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving
            </>
          ) : (
            <>
              Notify me <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {error && (
        <p className={`mt-2 text-sm ${isNight ? "text-accent" : "text-red-700"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
