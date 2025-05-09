import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{skipStores:StoreType[], totalPages: number, allStores:StoreType[]}>
) {
  const page = parseInt(req.query.page as string) || 1

  const prisma = new PrismaClient()
  const skipStores = await prisma.store.findMany({
    orderBy: {id:"asc"},
    skip:(page - 1) * 10,
    take: 10
  })
  const allStores = await prisma.store.findMany({
    orderBy: {id:"asc"},
  })
  const totalCount : any = await prisma.store.count()
  const totalPages = Math.ceil(totalCount / 10);


  res.status(200).json({skipStores, totalPages, allStores});
}