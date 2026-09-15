import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { recommendDifficulty } from "@/lib/adaptive";
import { gameById, type GameId } from "@/lib/game-catalog";

const gameIds = ["tile-memory", "picture-pairs", "missing", "arrows", "number-grid", "routine", "story", "categories", "instrument", "tambola"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sign in is required to save a result." }, { status: 401 });
  const body = await request.json();
  if (typeof body.gameId !== "string" || !gameIds.includes(body.gameId) || !Number.isInteger(body.difficulty) || body.difficulty < 1 || body.difficulty > 3) return NextResponse.json({ error: "Invalid game result." }, { status: 400 });
  const accuracy = Number(body.accuracy), completionTimeMs = Number(body.completionTimeMs), mistakes = Number(body.mistakes), hintsUsed = Number(body.hintsUsed);
  if (![accuracy, completionTimeMs, mistakes, hintsUsed].every(Number.isFinite) || accuracy < 0 || accuracy > 100 || completionTimeMs < 0 || mistakes < 0 || hintsUsed < 0) return NextResponse.json({ error: "Invalid performance values." }, { status: 400 });
  const definition = gameById(body.gameId as GameId);
  const game = await prisma.game.upsert({ where: { slug: definition.id }, update: {}, create: { slug: definition.id, name: definition.title, category: ["instrument", "tambola"].includes(definition.id) ? "CULTURAL" : "COGNITIVE", focus: definition.focus, instructions: definition.instructions } });
  const previous = await prisma.gameResult.findFirst({ where: { session: { userId: session.user.id, gameId: game.id } }, orderBy: { createdAt: "desc" } });
  const recommendation = recommendDifficulty({ accuracy, completionTimeMs, mistakes, hintsUsed, difficulty: body.difficulty, attempts: 1 }, previous ? [{ accuracy: previous.accuracy ?? 0, completionTimeMs: previous.completionTimeMs ?? 0, mistakes: previous.mistakes, hintsUsed: previous.hintsUsed, difficulty: body.difficulty, attempts: previous.attempts }] : []);
  const created = await prisma.gameSession.create({ data: { userId: session.user.id, gameId: game.id, difficulty: body.difficulty, completedAt: new Date(), result: { create: { accuracy, completionTimeMs: Math.round(completionTimeMs), mistakes: Math.round(mistakes), hintsUsed: Math.round(hintsUsed), attempts: 1, completed: true, adaptiveDecision: recommendation.decision } } }, include: { result: true } });
  await prisma.activityLog.create({ data: { userId: session.user.id, kind: "GAME", label: definition.title + " completed", metadata: { sessionId: created.id } } });
  return NextResponse.json({ sessionId: created.id, recommendation });
}
