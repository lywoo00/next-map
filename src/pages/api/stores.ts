import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";
type StoreListResponse =
  | { skipStores: StoreType[]; totalPages: number; allStores: StoreType[] }
  | { storeWithId: StoreType[] };
  interface ParamsType {
    id?: string
    q?: string;
    district? :string
  }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreListResponse>
) {
  const page = parseInt(req.query.page as string) || 1
  const {id, q, district}:ParamsType = req.query

  const prisma = new PrismaClient()

  if (id) {
    const storeWithId = await prisma.store.findMany({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ storeWithId });
  }
  const skipStores = await prisma.store.findMany({
    orderBy: { id: "asc" },
    skip: (page - 1) * 10,
    take: 10,
    where: {
      name: q ? { contains: q } : {},
      address: district ? { contains: district } : {},
    },
  });

  const allStores = await prisma.store.findMany({
    orderBy: { id: "asc" },
    where: {
      name: q ? { contains: q } : {},
      address: district ? { contains: district } : {},
    },
  });

  const totalCount = await prisma.store.count();
  const totalPages = Math.ceil(totalCount / 10);

  return res.status(200).json({ skipStores, totalPages, allStores });
}