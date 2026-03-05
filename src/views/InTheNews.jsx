"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// Articles are loaded from public/news.json - add your links there
export default function InTheNews() {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    fetch("/news.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]));
  }, []);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
              Media & Coverage
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
              In the News
            </h1>
            <p className="mt-6 text-lg text-[#474E5E] leading-relaxed max-w-2xl">
              Recent press and coverage featuring Heritage Development Partners
              and our projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Press"
            title="Articles & coverage"
            align="left"
          />
          {articles.length === 0 ? (
            <p className="mt-8 text-[#474E5E]">
              No articles yet. Add links in{" "}
              <code className="text-sm bg-stone-100 px-2 py-0.5 rounded">
                public/news.json
              </code>{" "}
              to display them here.
            </p>
          ) : (
            <ul className="mt-12 space-y-6">
              {articles.map((article, index) => (
                <motion.li
                  key={article.url || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-6 -mx-6 rounded-lg border border-transparent hover:border-[#474E5E]/20 hover:bg-[#F3F2ED]/50 transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2944]/10 text-[#1B2944]">
                      <Newspaper className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-[#070707] group-hover:text-[#1B2944] transition-colors">
                        {article.title || "Untitled"}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#474E5E]">
                        {article.source && <span>{article.source}</span>}
                        {article.date && (
                          <span>
                            {new Date(article.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="flex-shrink-0 w-5 h-5 text-[#474E5E] group-hover:text-[#1B2944] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      strokeWidth={1.5}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
