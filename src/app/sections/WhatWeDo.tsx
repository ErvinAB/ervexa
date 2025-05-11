'use client';
import { motion } from 'framer-motion';
import { Brain, Settings, BarChart2 } from 'lucide-react';

const features = [
  {
    title: "AI Agents",
    description: "Deploy intelligent systems that automate decisions and scale effortlessly.",
    icon: Brain,
  },
  {
    title: "Custom Workflows",
    description: "Design smart pipelines tailored to your business logic and data.",
    icon: Settings,
  },
  {
    title: "Real-Time Insights",
    description: "Monitor data, performance, and KPIs with instant, actionable dashboards.",
    icon: BarChart2,
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative z-10 w-full bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What We Do
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Ervexa helps teams build, automate, and scale cutting-edge AI solutions with precision and elegance.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Card content */}
              <div className="relative z-10 border border-white/10 bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:scale-[1.03] transition-transform duration-300">
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon size={36} className="text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
