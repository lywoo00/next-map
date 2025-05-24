/*global kakao*/
import { Dispatch, SetStateAction } from "react";
import Script from "next/script";
// import * as stores from "@/data/store_data.json";
import Markers from "./Markers";
import { AnyAaaaRecord } from "dns";
import { useLocationStore } from "@/justand/useStore";
import { useMapStore } from "@/justand/useStore";
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  // setMap: Dispatch<SetStateAction<any>>;
  lat?: string | null;
  lng?: string | null;
}
export default function Map({ lat, lng }: MapProps) {
  const {setMap} = useMapStore()
  const location = useLocationStore();
  const loadKakaoMap = () => {
    // kakao map 로드
    console.log("✅ Kakao maps is available");
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) return;
      // const mapOption = null;

      if (lat && lng) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            parseFloat(lat),
            parseFloat(lng)
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(map);
      } else {
        const mapOption = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(map);
      }
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div
        id="map"
        className="w-full h-screen"
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </>
  );
}
