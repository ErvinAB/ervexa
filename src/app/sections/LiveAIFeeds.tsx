'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { fetchLiveFeeds } from '../utils/fetchLiveFeeds';
import { mockFeeds, FeedPost } from '../utils/mockFeeds';

export default function LiveAIFeeds() {
  const [feeds, setFeeds] = useState<FeedPost[]>([]);

  useEffect(() => {
    const loadFeeds = async () => {
      const live = await fetchLiveFeeds();
      setFeeds(live.length > 0 ? live : mockFeeds);
    };
    loadFeeds();
  }, []);

  return (
    <section className="w-full bg-black text-white py-24 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Live AI Feeds
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Stay updated with the latest from AI news sources and breakthrough innovations.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {feeds.slice(0, 6).map((post: FeedPost, index: number) => (
            <motion.a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 transition hover:scale-[1.02] hover:shadow-[0_0_0_2px_rgba(0,255,255,0.15)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4 text-cyan-400 text-xs font-medium uppercase tracking-wide">
                <Bookmark size={16} />
                {post.source}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-3">{post.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-block mt-4 bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-200 transition"
          >
            View All Feeds
          </a>
        </motion.div>
      </div>
    </section>
  );
}
