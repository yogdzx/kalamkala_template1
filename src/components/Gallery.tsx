"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.images && Array.isArray(data.images)) {
            setImages(data.images);
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      }
    };

    fetchGallery();
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center border border-primary/20">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-4xl font-serif text-primary-dark mb-4">Our Gallery</h2>
        <p className="text-foreground/70 mb-12 max-w-lg mx-auto font-sans">
          Momen bahagia kami yang terabadikan.
        </p>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {images.map((img, index) => {
            // Give some variation to the grid items
            const isLarge = index === 0 || index === 3;
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative overflow-hidden rounded-2xl group ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
