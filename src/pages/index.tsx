import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
// import * as stores from "@/data/store_data.json";
import { StoreType } from "@/interface";
import { useState } from "react";
// import { PrismaClient } from "@prisma/client";

export default function Home({ stores }: { stores: StoreType[] }) {
  // const prisma = new PrismaClient();
  // console.log(prisma);

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        storeDatas={stores}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/stores`
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error:", res.status, text);
    return { props: { stores: [] } };
  }

  const stores = await res.json();

  return {
    props: { stores },
    revalidate: 3600,
  };
}
