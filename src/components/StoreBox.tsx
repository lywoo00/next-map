import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AiOutlineClose,
  AiTwotoneInfoCircle,
  AiOutlineCheckCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { StoreType } from "@/interface";

interface StoreBoxprops {
  currentStore: StoreType | null;
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ currentStore, setCurrentStore }: StoreBoxprops) {
  const router = useRouter()
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {currentStore && (
        <div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-start w-full">
                <Image
                  src={
                    currentStore?.category
                      ? `/images/markers/${currentStore?.category}.png`
                      : `/images/markers/default.png`
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <p className="font-semibold">{currentStore?.name}</p>
                  <p className="font-sm">{currentStore?.storeType}</p>
                </div>
              </div>
              <button type="button" onClick={() => setCurrentStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-4">
              <p className="flex gap-2 items-start">
                <HiOutlineMapPin className="" />
                <span className="leading-none font-xs">
                  {currentStore?.address}
                </span>
              </p>
              <p className="mt-2 flex gap-2 items-start ">
                <AiOutlinePhone className="" />
                <span className="leading-none font-xs">{currentStore?.phone}</span>
              </p>
              <p className="mt-2 flex gap-2 items-start ">
                <AiTwotoneInfoCircle className="" />
                <span className="leading-none font-xs">
                  {currentStore?.foodCertifyName}
                </span>
              </p>
              <p className="mt-2 flex gap-2 items-start ">
                <AiOutlineCheckCircle className="" />
                <span className="leading-none font-xs">
                  {currentStore?.category}
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${currentStore.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-600 py-3 text-white font-smibold rounded-b-lg"
          >
            상세보기
          </button>
        </div>
      )}
    </div>
  );
}
