import { NextResponse } from "next/server";
import { d1Get, d1Post, d1Query } from "@/lib/d1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitation_id") || process.env.INVITATION_ID;

  if (!invitationId) {
    return NextResponse.json({ error: "Missing invitation_id" }, { status: 400 });
  }

  try {
    const rsvps = await d1Get("rsvps", { invitation_id: invitationId });
    
    // Calculate stats
    const total = rsvps.length;
    const hadir = rsvps.filter((r: any) => r.attendance === "hadir").length;
    const tidakHadir = rsvps.filter((r: any) => r.attendance === "tidak_hadir").length;
    const totalGuests = rsvps
      .filter((r: any) => r.attendance === "hadir")
      .reduce((sum: number, r: any) => sum + (r.guest_count || 1), 0);

    return NextResponse.json({
      rsvps,
      stats: { total, hadir, tidakHadir, totalGuests }
    });
  } catch (error) {
    console.error("Failed to fetch rsvps", error);
    return NextResponse.json({ error: "Failed to fetch rsvps" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const invitationId = body.invitation_id || process.env.INVITATION_ID;

    if (!invitationId || !body.guest_name || !body.status || !body.guest_count) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      id: `rsvp_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      invitation_id: invitationId,
      guest_name: body.guest_name,
      attendance: body.status.toLowerCase() === "hadir" ? "hadir" : "tidak_hadir",
      guest_count: parseInt(body.guest_count, 10) || 1,
    };

    const result = await d1Post("rsvps", payload);

    // Fetch whatsapp number
    let whatsappNumber = "";
    let invitationTitle = "";
    try {
      const invData = await d1Query("SELECT whatsapp_number, title FROM invitations WHERE id = ?", [invitationId]);
      if (invData && invData[0]) {
        whatsappNumber = invData[0].whatsapp_number || "";
        invitationTitle = invData[0].title || "";
      }
    } catch (e) {
      console.error("Failed to fetch invitation details for RSVP", e);
    }

    return NextResponse.json({ 
      success: true, 
      data: result,
      whatsapp_number: whatsappNumber,
      invitation_title: invitationTitle
    });
  } catch (error) {
    console.error("Failed to post rsvp", error);
    return NextResponse.json({ error: "Failed to post rsvp" }, { status: 500 });
  }
}
