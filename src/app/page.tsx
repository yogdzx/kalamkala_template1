import { d1Query } from "@/lib/d1";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import OurStory from "@/components/OurStory";
import WeddingGift from "@/components/WeddingGift";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Wishes from "@/components/Wishes";
import Cover from "@/components/Cover";

export const revalidate = 0; // Disable static rendering to always fetch latest

export default async function Home() {
  const invitationId = process.env.INVITATION_ID;

  let invitation: any = null;
  let couples: any[] = [];
  let events: any[] = [];
  let stories: any[] = [];
  let gifts: any[] = [];

  if (invitationId) {
    // Attempt to fetch from DB
    try {
      const [invData, cplData, evtData, strData, gftData] = await Promise.all([
        d1Query("SELECT * FROM invitations WHERE id = ?", [invitationId]),
        d1Query("SELECT * FROM couples WHERE invitation_id = ?", [invitationId]),
        d1Query("SELECT * FROM events WHERE invitation_id = ?", [invitationId]),
        d1Query("SELECT * FROM stories WHERE invitation_id = ?", [invitationId]),
        d1Query("SELECT * FROM gifts WHERE invitation_id = ?", [invitationId]),
      ]);

      invitation = invData[0] || null;
      couples = cplData || [];
      events = evtData || [];
      stories = strData || [];
      gifts = gftData || [];
    } catch (error) {
      console.error("Failed to fetch invitation data", error);
    }
  }

  // Fallback to static data as requested by user if DB is empty or fails
  const bride = couples.find((c: any) => c.role === 'bride') || {
    role: 'bride',
    nickname: "Sarah",
    full_name: "Sarah Ayu",
    father_name: "Bapak Sutreamo",
    mother_name: "Ibu Maria",
    parent_of_order: 1
  };

  const groom = couples.find((c: any) => c.role === 'groom') || {
    role: 'groom',
    nickname: "Bima",
    full_name: "Bima Surya",
    father_name: "Bapak Marano",
    mother_name: "Ibu Farah",
    parent_of_order: 1
  };

  const finalAyatText = invitation?.ayat_text || "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ";
  const finalAyatSource = invitation?.ayat_source || "QS. Ar-Rum: 21";

  const finalEvents = events.length > 0 ? events : [
    {
      event_type: "akad",
      title: "Akad & Resepsi",
      event_date: "2026-04-12",
      start_time: "09:00",
      end_time: "Selesai",
      timezone: "WIB",
      location_name: "Gedung Pernikahan",
      location_address: "Jl. Lorem Ipsum dolor sit amet",
      google_maps_url: "https://maps.google.com"
    }
  ];

  const finalStories = stories.length > 0 ? stories : [
    {
      date_label: "Fase 1",
      title: "Awal Bertemu",
      description: "Pertemuan pertama yang tak terduga namun menjadi awal dari segalanya.",
      order_index: 1
    },
    {
      date_label: "Fase 2",
      title: "Komitmen",
      description: "Kami memutuskan untuk menjalin hubungan yang lebih serius.",
      order_index: 2
    },
    {
      date_label: "Fase 3",
      title: "Lamaran",
      description: "Momen bahagia di mana kami mengikat janji di hadapan keluarga besar.",
      order_index: 3
    },
    {
      date_label: "Fase 4",
      title: "Menikah",
      description: "Hari bahagia yang kami nantikan untuk memulai lembaran baru bersama.",
      order_index: 4
    }
  ];

  const finalGifts = gifts.length > 0 ? gifts : [
    {
      bank_name: "SeaBank",
      account_number: "1122334455",
      account_name: "Bima Surya"
    },
    {
      bank_name: "DANA",
      account_number: "081234567890",
      account_name: "Bima Surya"
    }
  ];

  // For Countdown, use the first event's date
  const targetDate = finalEvents[0]?.event_date ? `${finalEvents[0].event_date}T${finalEvents[0].start_time}:00` : "2026-04-12T09:00:00";

  return (
    <main className="min-h-screen bg-stone-50">
      <Cover
        brideNickname={bride.nickname}
        groomNickname={groom.nickname}
      />
      <Hero
        brideNickname={bride.nickname}
        groomNickname={groom.nickname}
        ayatText={finalAyatText}
        ayatSource={finalAyatSource}
      />

      <Profile couples={[bride, groom]} />

      <Countdown targetDate={targetDate} />

      <OurStory stories={finalStories} />

      <EventDetails events={finalEvents} />

      <WeddingGift gifts={finalGifts} />

      <Gallery />

      <RSVP invitationId={invitationId} whatsappNumber={invitation?.whatsapp_number} />

      <Wishes invitationId={invitationId} />

      <footer className="bg-black py-16 flex flex-col items-center justify-center text-center">
        {/* Logo Container */}
        <div className="mb-8">
          <img 
            src="/KalamKalaLogo3.png"
            alt="Kalam Kala Logo"
            className="w-20 h-20 object-contain" 
            />
      </div>

        {/* Names */}
        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">
          {bride.nickname} & {groom.nickname}
        </h2>

        {/* Thank You Message */}
        <div className="text-gray-300 font-sans text-sm md:text-base max-w-md mx-auto leading-relaxed mb-12">
          <p>Terima kasih atas doa dan restu yang telah diberikan.</p>
          <p>Semoga Allah SWT membalas kebaikan Anda.</p>
        </div>

        {/* Divider Line */}
        <div className="w-3/4 max-w-lg h-px bg-gradient-to-r from-black via-gray-700 to-black mb-8"></div>

        {/* Credits */}
        <div className="font-sans flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            Designed by Kalamkala
          </p>
          <p className="text-[10px] text-gray-600">
            &copy; 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}