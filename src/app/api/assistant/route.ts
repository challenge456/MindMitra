import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

function fallback(message: string) {
  if (message.includes("game")) return "You can choose a memory, attention, recall, sequencing, recognition, or Northeast activity.";
  if (message.includes("memory")) return "Choose My Memories to see familiar family, places, stories, and cultural moments.";
  return "I can help with your day, your next reminder, games, and memories. Try asking: What do I have today?";
}

export async function POST(request: Request) {
  const body = await request.json();
  if (typeof body.message !== "string" || body.message.length > 500) return NextResponse.json({ error: "Please send a shorter question." }, { status: 400 });
  const message = body.message.toLowerCase();
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ answer: fallback(message), source: "local" });
  const next = await prisma.reminder.findFirst({ where: { elderId: session.user.id, isActive: true, scheduledFor: { gte: new Date() } }, orderBy: { scheduledFor: "asc" } });
  const answer = message.includes("next") || message.includes("today") || message.includes("reminder") ? (next ? "Your next reminder is " + next.title + " at " + next.scheduledFor.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + "." : "There are no upcoming reminders recorded for today.") : message.includes("game") ? "You can play memory, attention, recall, sequencing, recognition, and Northeast-inspired activities. Choose Games to begin." : message.includes("memory") ? "Choose My Memories to look at family, places, stories, and Northeast moments." : fallback(message);
  return NextResponse.json({ answer, source: "account" });
}
