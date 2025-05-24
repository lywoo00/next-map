import React, { Dispatch, SetStateAction, use, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { DISTRICT_ARR } from "@/data/store";

interface SearchFilterProps {
  setQ: Dispatch<SetStateAction<string | null>>;
  setDistrict: Dispatch<SetStateAction<string | null>>;
  q:string | null
  district: string | null
}
const SearchFilter = ({ setQ, setDistrict,q ,district}: SearchFilterProps) => {

  const [inputValue, setInputValue] = useState("")

  const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter") {
      setQ(inputValue)
    }
  }
  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2 border border-gray-300 rounded-lg bg-gray-50 pl-3">
        <AiOutlineSearch className="w-6 h-6" />
        <input
          type="search"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearch}
          value={inputValue || ""}
          placeholder="음식점 검색"
          className="block w-full p-3 text-sm text-gray-800  outline-none focus:border-blue-500"
        />
      </div>
      <select
        onChange={(e) => setDistrict(e.target.value || null)}
        value={district || ""}
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 outline-none block w-full p-3"
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
