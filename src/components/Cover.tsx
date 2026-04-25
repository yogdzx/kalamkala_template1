"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MailOpen } from "lucide-react";

interface CoverProps {
  brideNickname: string;
  groomNickname: string;
}

export default function Cover({ brideNickname, groomNickname }: CoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-stone-900 text-white"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/couple-cover.png"
              alt="Couple Photo"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="z-10 flex flex-col items-center text-center px-6"
          >
            <span className="text-sm tracking-widest uppercase mb-4 text-white/80">
              The Wedding Of
            </span>
            <h1 className="text-6xl md:text-8xl font-serif mb-6 text-secondary">
              {groomNickname} & {brideNickname}
            </h1>
            <p className="text-lg md:text-xl font-sans text-white/80 mb-12">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <MailOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Buka Undangan
              <span className="absolute inset-0 rounded-full border border-white/20 scale-105 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
