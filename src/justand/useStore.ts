import { LocationType } from "@/interface";
// import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

const DEFAULT_LAT = "37.497625203";
const DEFAULT_LNG = "127.03088379";


interface MapStore {
    map: any
    setMap: (map: any) => void;
  }

  export const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map) => set({ map }),
  }));

export const currentStore = create(() => {});

export const useLocationStore = create<LocationType>((set) => ({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
}));
