import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      className={`flex flex-col gap-2 ${alignment} mb-12`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>

      {description && (
        <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
