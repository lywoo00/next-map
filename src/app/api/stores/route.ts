// src/app/api/stores/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");

  const stores = await prisma.store.findMany({
    orderBy: { id: "asc" },
    skip: (page - 1) * 10,
    take: 10,
  });

  const allStores = await prisma.store.findMany({
    orderBy: { id: "asc" },
  });

  const totalCount = await prisma.store.count();
  const totalPages = Math.ceil(totalCount / 10);

  return NextResponse.json({ stores, totalPages, allStores });
}
