import { StoreType } from '@/interface'
import React from 'react'
import Image from 'next/image'

const StoreList = ({ stores }: { stores: StoreType[] }) => {
    console.log('stores',stores)
  return (
    <ul role="list" className="divide-y divide-gray-100">
        {stores.map((store, index) => (
          <li className="flex justify-between gap-x-6 py-5" key={index}>
            <div className="flex gap-x-4">
              <Image
                src={
                  store?.category
                    ? `/images/markers/${store?.category}.png`
                    : "/images/markers/default.png"
                }
                width={48}
                height={48}
                alt="아이콘 이미지"
              />
              <div>
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {store?.name}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {store?.storeType}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                {store?.address}
              </div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
                {store?.category}
              </div>
            </div>
          </li>
        ))}
      </ul>
  )
}

export default StoreList