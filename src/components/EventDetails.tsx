"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

interface Event {
  event_type: string;
  title: string;
  event_date: string;
  start_time: string;
  end_time?: string;
  timezone: string;
  location_name: string;
  location_address: string;
  google_maps_url?: string;
}

interface EventDetailsProps {
  events: Event[];
}

export default function EventDetails({ events }: EventDetailsProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <h2 className="text-4xl font-serif text-primary-dark mb-4">Waktu & Lokasi</h2>
        <p className="text-foreground/70 mb-16 max-w-xl mx-auto font-sans">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-secondary/50 p-8 md:p-12 rounded-3xl border border-primary/20 hover:border-primary/40 transition-colors shadow-lg"
          >
            <h3 className="text-3xl font-serif text-primary-dark mb-8">Rangkaian Acara</h3>
            
            <div className="space-y-6 mb-10 text-left max-w-md mx-auto">
              {/* Tanggal (from events[0]) */}
              <div className="flex items-start gap-4 pb-6 border-b border-primary/10">
                <Calendar className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Tanggal</p>
                  <p className="text-foreground/80">
                    {new Date(events[0].event_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              {/* Waktu (List of events) */}
              <div className="flex items-start gap-4 pb-6 border-b border-primary/10">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="w-full">
                  <p className="font-semibold text-foreground text-lg mb-3">Waktu Acara</p>
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <div key={index} className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-primary/5 shadow-sm">
                        <span className="font-medium text-primary-dark capitalize">{event.title}</span>
                        <span className="text-foreground/70 font-medium">
                          {event.start_time} - {event.end_time || "Selesai"} {event.timezone}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lokasi */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">Lokasi: {events[0].location_name}</p>
                  <p className="text-foreground/80 text-sm leading-relaxed">{events[0].location_address}</p>
                </div>
              </div>
            </div>

            {/* Map Embed (from events[0]) */}
            <div className="w-full h-72 mb-8 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-inner">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(events[0].location_name + ' ' + events[0].location_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <a 
              href={events[0].google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(events[0].location_name + ' ' + events[0].location_address)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full max-w-sm mx-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              <MapPin className="w-5 h-5" />
              Buka di Google Maps
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
