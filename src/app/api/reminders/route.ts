import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const types = ["MEDICINE", "MEAL", "HYDRATION", "APPOINTMENT", "ACTIVITY", "COGNITIVE_SESSION", "PERSONAL"];

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  return NextResponse.json(await prisma.reminder.findMany({ where: { elderId: session.user.id, isActive: true }, orderBy: { scheduledFor: "asc" }, take: 20 }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const body = await request.json();
  if (typeof body.title !== "string" || body.title.trim().length < 2 || body.title.length > 120 || !types.includes(body.type) || Number.isNaN(Date.parse(body.scheduledFor))) return NextResponse.json({ error: "Please provide a valid title, category, and date." }, { status: 400 });
  const reminder = await prisma.reminder.create({ data: { elderId: session.user.id, createdById: session.user.id, title: body.title.trim(), description: typeof body.description === "string" ? body.description.slice(0, 500) : null, type: body.type, scheduledFor: new Date(body.scheduledFor), repeatRule: typeof body.repeatRule === "string" ? body.repeatRule.slice(0, 80) : null } });
  return NextResponse.json(reminder, { status: 201 });
}
