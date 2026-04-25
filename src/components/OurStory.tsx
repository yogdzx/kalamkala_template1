"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Story {
  date_label: string;
  title: string;
  description: string;
  order_index: number;
}

interface OurStoryProps {
  stories: Story[];
}

export default function OurStory({ stories }: OurStoryProps) {
  if (!stories || stories.length === 0) return null;

  // Sort stories by order_index
  const sortedStories = [...stories].sort((a, b) => a.order_index - b.order_index);

  return (
    <section className="py-24 px-6 bg-secondary text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-serif text-primary-dark mb-4">Kisah Cinta Kami</h2>
        <p className="text-foreground/70 mb-16 max-w-xl mx-auto font-sans">
          Sebuah perjalanan yang membawa kami pada ikatan suci ini.
        </p>

        <div className="relative border-l-2 border-primary/30 md:border-none md:flex md:justify-center md:flex-col ml-4 md:ml-0">
          {/* Vertical line for desktop centered timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />

          {sortedStories.map((story, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-center w-full ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-secondary z-10">
                  <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
                    <Heart className="w-4 h-4 text-primary fill-primary/20" />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`md:w-5/12 pl-8 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-shadow">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary-dark rounded-full text-xs font-semibold mb-3">
                      {story.date_label}
                    </span>
                    <h3 className="text-xl font-serif text-primary-dark mb-2">{story.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed text-left md:text-inherit">
                      {story.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
