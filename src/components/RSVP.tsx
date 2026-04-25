"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";

interface RSVPProps {
  invitationId?: string;
  whatsappNumber?: string;
}

export default function RSVP({ invitationId, whatsappNumber }: RSVPProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [guestCount, setGuestCount] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama harus diisi");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          invitation_id: invitationId,
          guest_name: name, 
          status,
          guest_count: guestCount
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        
        // Open WhatsApp if number is available
        const waNumber = data.whatsapp_number || whatsappNumber;
        if (waNumber) {
          const text = `Halo, saya ${name}. Mengkonfirmasi bahwa saya akan *${status}* pada acara pernikahan ${data.invitation_title || 'Anda'} dengan membawa ${guestCount} orang. Terima kasih.`;
          const encodedText = encodeURIComponent(text);
          // format waNumber to ensure it starts with correct country code, usually it's +62
          const cleanNumber = waNumber.replace(/[^0-9]/g, '');
          window.open(`https://wa.me/${cleanNumber}?text=${encodedText}`, '_blank');
        }
      } else {
        setError(data.error || "Gagal mengirim RSVP");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-secondary text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-primary/20">
            <CheckSquare className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-4xl font-serif text-primary-dark mb-4">RSVP</h2>
        <p className="text-foreground/70 mb-12 max-w-lg mx-auto font-sans">
          Mohon konfirmasi kehadiran Anda untuk memudahkan kami dalam mempersiapkan acara.
        </p>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-primary/20"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-serif text-primary-dark mb-2">Terima Kasih!</h3>
            <p className="text-foreground/70 mb-6">Konfirmasi kehadiran Anda telah kami terima.</p>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setName("");
              }}
              className="text-primary hover:text-primary-dark font-medium underline"
            >
              Kirim Konfirmasi Lain
            </button>
          </motion.div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 text-left">
            <form onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-sm mb-6 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Nama Anda</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-stone-50"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Konfirmasi Kehadiran</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-stone-50 appearance-none"
                    disabled={isSubmitting}
                  >
                    <option value="Hadir">Ya, Saya akan hadir</option>
                    <option value="Tidak Hadir">Maaf, saya tidak bisa hadir</option>
                  </select>
                </div>

                {status === "Hadir" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Jumlah Tamu</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-stone-50 appearance-none"
                      disabled={isSubmitting}
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                    </select>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-medium transition-colors disabled:opacity-70 mt-4"
                >
                  {isSubmitting ? "Memproses..." : "Kirim Konfirmasi"}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </section>
  );
}
