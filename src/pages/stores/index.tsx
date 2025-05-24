import { StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import SearchFilter from "@/components/SearchFilter";
import { useDebounce } from "@/hooks/useDebounce";
import StoreList from "@/components/StoreList";
export default function StoreListPage() {
  type ApiResponse = {
    skipStores: StoreType[];
    totalPages: number;
  };
  const [page, setPage] = useState(1);

  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const searchParams = {
    q: q,
    district: district,
  };


  const { isLoading, isError, data } = useQuery<ApiResponse>({
    queryKey: ["skipStores", page, q, district],
    queryFn: async () => {
      const res = await axios.get(`/api/stores`, {
        params: {
          page: page,
          ...searchParams,
        },
      });

      return res.data;
    },
    refetchOnWindowFocus: false,
    // keepPreviousData: true,
  });


  useEffect(() => {
    setPage(1);
  }, [q, district]);

  // useEffect(() => {
  //   setQ("")
  // },[district])

  // useEffect(() => {
  //   setDistrict("")
  // },[q])

  


  if (!data) return null;



  let groupStart = Math.max(page - Math.floor(10 / 2), 1);
  let groupEnd = groupStart + 10 - 1;

  if (groupEnd > data?.totalPages) {
    groupEnd = data?.totalPages;
    groupStart = Math.max(groupEnd - 10 + 1, 1);
  }

  const pagenationArrowBtn = (type: string) => {
    if (type == "prev") {
      setPage(Math.max(1, groupStart - 10));
    }
    if (type == "next") {
      setPage(Math.min(data.totalPages, groupStart + 10));
    }
  };

  const pagenationNumBtn = (pageNumber: number) => {
    setPage(pageNumber);
  };



  if (isError)
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  return isLoading ? (
    <Loading />
  ) : (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <SearchFilter setQ={setQ} q={q} setDistrict={setDistrict} district={district} />
      <StoreList stores={data.skipStores} />
      <div className="pagenation-wrap flex justify-center">
        <button
          onClick={() => pagenationArrowBtn("prev")}
          disabled={groupStart === 1}
        >
          ◀️
        </button>
        <ul className="pagenation flex justify-center">
          {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => {
            const pageNumber = groupStart + i;
            return (
              <li key={i}>
                <button
                  key={pageNumber}
                  onClick={() => pagenationNumBtn(pageNumber)}
                  className={`px-2 ${
                    page === pageNumber ? "font-bold underline" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => pagenationArrowBtn("next")}
          disabled={groupEnd === data.totalPages}
        >
          ▶️
        </button>
      </div>
    </div>
  );
}
