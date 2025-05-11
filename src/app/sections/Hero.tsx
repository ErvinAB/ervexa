'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0f0f0f] to-[#1a1a1a]" />

      {/* Centered Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Empowering the Future of AI
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Ervexa builds intelligent systems to automate, analyze, and scale tomorrow’s solutions.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
          >
            Get in Touch
          </a>
          <a
            href="#ai-use-cases"
            className="px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition"
          >
            Explore Use Cases
          </a>
        </motion.div>
      </div>
    </section>
  );
}
