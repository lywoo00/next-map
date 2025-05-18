"use client";
import Map from "./Map";
import Markers from "./Markers";
import StoreBox from "./StoreBox";
import { StoreType } from "../interface";
import { useState } from "react";

export default function StorePage({ stores }: { stores: StoreType[] }) {
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
