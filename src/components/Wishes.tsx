"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircleHeart, Send } from "lucide-react";

interface Comment {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

interface WishesProps {
  invitationId?: string;
}

export default function Wishes({ invitationId }: WishesProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      const url = invitationId ? `/api/comments?invitation_id=${invitationId}` : '/api/comments';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Nama dan ucapan harus diisi");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          invitation_id: invitationId,
          guest_name: name, 
          message 
        }),
      });

      if (res.ok) {
        setName("");
        setMessage("");
        fetchComments(); // Refresh list
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mengirim ucapan");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-stone-100 relative text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
            <MessageCircleHeart className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-4xl font-serif text-primary-dark mb-4">Ucapan & Doa</h2>
        <p className="text-foreground/70 mb-12 max-w-lg mx-auto font-sans">
          Tinggalkan pesan, doa, dan harapan untuk kedua mempelai.
        </p>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-primary/10 text-left">
          <form onSubmit={handleSubmit} className="mb-10">
            {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Nama Anda</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Budi & Keluarga"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-stone-50"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Ucapan</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Selamat menempuh hidup baru..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-stone-50 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Mengirim..." : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Ucapan
                  </>
                )}
              </button>
            </div>
          </form>

          {/* List of comments */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {comments.length === 0 ? (
              <p className="text-center text-foreground/50 text-sm italic py-8">
                Belum ada ucapan. Jadilah yang pertama memberikan doa!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary-dark">{comment.guest_name}</h4>
                    <span className="text-xs text-foreground/40">
                      {new Date(comment.created_at || Date.now()).toLocaleDateString("id-ID", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">{comment.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
