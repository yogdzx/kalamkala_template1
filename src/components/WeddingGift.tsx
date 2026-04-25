"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, Gift } from "lucide-react";

interface GiftItem {
  bank_name: string;
  account_number: string;
  account_name: string;
  qris_image_url?: string;
}

interface WeddingGiftProps {
  gifts: GiftItem[];
}

export default function WeddingGift({ gifts }: WeddingGiftProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  if (!gifts || gifts.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-4xl font-serif text-primary-dark mb-4">Wedding Gift</h2>
        <p className="text-foreground/70 mb-12 max-w-lg mx-auto font-sans">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.account_number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-secondary/30 p-8 rounded-2xl border border-primary/20 flex flex-col items-center"
            >
              <h3 className="text-xl font-bold font-sans text-foreground mb-4 uppercase tracking-wider">
                {gift.bank_name}
              </h3>
              
              <p className="text-2xl font-serif text-primary-dark mb-1 tracking-widest">
                {gift.account_number}
              </p>
              <p className="text-sm text-foreground/70 mb-6 uppercase">
                a.n {gift.account_name}
              </p>

              {gift.qris_image_url && (
                <div className="mb-6 p-2 bg-white rounded-xl shadow-sm border border-primary/10">
                  <img 
                    src={gift.qris_image_url} 
                    alt={`QRIS ${gift.bank_name}`}
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <button
                onClick={() => handleCopy(gift.account_number)}
                className="mt-auto flex items-center gap-2 px-6 py-2.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium transition-all text-sm w-full justify-center"
              >
                {copiedAccount === gift.account_number ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin No. Rekening
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
