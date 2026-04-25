import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    
    let images: any[] = [];
    
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      
      images = files
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map((file, index) => ({
          id: `gal_${index + 1}`,
          src: `/gallery/${file}`,
          alt: `Gallery Image ${index + 1}`
        }));
    }

    // Fallback if no images found
    if (images.length === 0) {
      images = [
        { id: "gal_1", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", alt: "Gallery 1" },
        { id: "gal_2", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", alt: "Gallery 2" },
        { id: "gal_3", src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop", alt: "Gallery 3" },
        { id: "gal_4", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop", alt: "Gallery 4" },
        { id: "gal_5", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop", alt: "Gallery 5" },
        { id: "gal_6", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop", alt: "Gallery 6" },
      ];
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to fetch gallery", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
