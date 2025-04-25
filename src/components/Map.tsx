/*global kakao*/
import Script from "next/script";
import * as stores from "@/data/store_data.json";
import { setMaxIdleHTTPParsers } from "http";
declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const DEFAULT_LAT = 37.50042;
  const DEFUALT_LNG = 127.026821;
  const loadKakaoMap = () => {
    // kakao map 로드
    console.log("✅ Kakao maps is available");
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFUALT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      stores?.["DATA"].map((store) => {
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(store.y_dnts, store.x_cnts),
        });

        marker.setMap(map);

        let markerImg = store?.bizcnd_code_nm
          ? store?.bizcnd_code_nm
          : "default";
        var markerImage = new window.kakao.maps.MarkerImage(
          `/images/markers/${markerImg}.png`,
          new window.kakao.maps.Size(31, 35),
          new window.kakao.maps.Point(13, 34)
        );
        // marker.setPosition(new window.kakao.maps.LatLng(store.y_dnts, store.x_cnts));
        marker.setImage(markerImage);

        var infowindow = new window.kakao.maps.InfoWindow({
          // map: map,
          position: new window.kakao.maps.LatLng(store.y_dnts, store.x_cnts),
          content: store.rdn_code_nm,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', function() {  
          infowindow.open(map, marker);        
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', function() {  
        infowindow.close();        
    });

        
      });
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
