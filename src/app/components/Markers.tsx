import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
// import { StoreType } from "@/interface";

interface MarkersProps {
  map: any;
  storeDatas: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}
export default function Markers({
  map,
  storeDatas,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      storeDatas?.map((store) => {
        const makerPosition = new window.kakao.maps.LatLng(
          store.lat,
          store.lng
        );
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

        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, storeDatas]);
  useEffect(() => {
    loadKakaoMarkers();
  }, [map, loadKakaoMarkers]);
  return <></>;
}
