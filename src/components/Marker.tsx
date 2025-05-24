import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useMapStore } from "@/justand/useStore";
// import { StoreType } from "@/interface";

interface MarkerProps {
  store: StoreType;
}

export default function Marker({
  store,
}:
MarkerProps) {
  const {map} = useMapStore()
  const loadKakaoMarker = useCallback(() => {
    if (map) {
      const makerPosition = new window.kakao.maps.LatLng(store.lat, store.lng);
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: makerPosition,
      });
      marker.setMap(map);

      const markerImg = store?.category ? store?.category : "default";
      const markerImage = new window.kakao.maps.MarkerImage(
        `/images/markers/${markerImg}.png`,
        new window.kakao.maps.Size(31, 35),
        new window.kakao.maps.Point(13, 34)
      );
      marker.setImage(markerImage);
      const content = `<div class="infowindow">${store?.name}</div>`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: makerPosition,
        content: content,
        xAnchor: 0.5,
        yAnchor: 0,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        customOverlay.setMap(map);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        customOverlay.setMap(null);
      });

    //   window.kakao.maps.event.addListener(marker, "click", function () {
    //     setCurrentStore(store);
    //   });
    }
  }, [map, store]);
  useEffect(() => {
    loadKakaoMarker();
  }, [map, loadKakaoMarker]);
  return <></>;
}
