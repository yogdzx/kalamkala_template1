import { NextResponse } from "next/server";
import { d1Get, d1Post } from "@/lib/d1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitation_id") || process.env.INVITATION_ID;

  if (!invitationId) {
    return NextResponse.json({ error: "Missing invitation_id" }, { status: 400 });
  }

  try {
    const comments = await d1Get("comments", { invitation_id: invitationId });
    // Sort comments by created_at descending (newest first)
    comments.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const invitationId = body.invitation_id || process.env.INVITATION_ID;

    if (!invitationId || !body.guest_name || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      id: `cmt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      invitation_id: invitationId,
      guest_name: body.guest_name,
      message: body.message,
    };

    const result = await d1Post("comments", payload);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to post comment", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
