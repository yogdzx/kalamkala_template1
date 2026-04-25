"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CoupleProps {
  couples: any[];
}

export default function Profile({ couples }: CoupleProps) {
  const groom = couples?.find((c) => c.role === "groom");
  const bride = couples?.find((c) => c.role === "bride");

  // Defaults fallback
  const groomName = groom?.full_name || "Bima Surya";
  const groomParents = groom?.father_name && groom?.mother_name 
    ? `Bapak ${groom.father_name} & Ibu ${groom.mother_name}`
    : "Bapak Marano & Ibu Farah";
  const groomOrderStr = groom?.parent_of_order ? `Putra ke-${groom.parent_of_order} dari` : "Putra pertama dari";

  const brideName = bride?.full_name || "Sarah Ayu";
  const brideParents = bride?.father_name && bride?.mother_name
    ? `Bapak ${bride.father_name} & Ibu ${bride.mother_name}`
    : "Bapak Sutreamo & Ibu Maria";
  const brideOrderStr = bride?.parent_of_order ? `Putri ke-${bride.parent_of_order} dari` : "Putri kedua dari";

  return (
    <section id="profile" className="py-24 bg-secondary flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-primary-dark tracking-widest uppercase text-xs md:text-sm mb-3 block font-semibold">
          Bride & Groom
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-primary-dark">Pasangan Pengantin</h2>
        <div className="w-16 h-[2px] bg-primary mx-auto mt-6"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center justify-center w-full max-w-5xl relative z-10">
        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center max-w-[280px]"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white ring-1 ring-primary/20 mb-6 relative shadow-xl">
            <Image 
              src="/couple-cover.png" 
              alt="Groom Photo" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>
          <h3 className="text-3xl font-serif text-primary-dark mb-2">{groomName}</h3>
          <p className="text-sm text-foreground/70 mb-1">{groomOrderStr}</p>
          <p className="font-semibold text-foreground/90 mb-4">{groomParents}</p>
          {groom?.instagram_username && (
            <a href={`https://instagram.com/${groom.instagram_username.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-primary text-sm shadow-sm hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              {groom.instagram_username.replace('@', '')}
            </a>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl font-serif text-primary/30 hidden md:block"
        >
          &
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl font-serif text-primary/30 md:hidden"
        >
          &
        </motion.div>

        {/* Bride */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center text-center max-w-[280px]"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white ring-1 ring-primary/20 mb-6 relative shadow-xl">
            <Image 
              src="/couple-cover.png" 
              alt="Bride Photo" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>
          <h3 className="text-3xl font-serif text-primary-dark mb-2">{brideName}</h3>
          <p className="text-sm text-foreground/70 mb-1">{brideOrderStr}</p>
          <p className="font-semibold text-foreground/90 mb-4">{brideParents}</p>
          {bride?.instagram_username && (
            <a href={`https://instagram.com/${bride.instagram_username.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-primary text-sm shadow-sm hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              {bride.instagram_username.replace('@', '')}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
