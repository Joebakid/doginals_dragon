/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Card({ data, index }) {
  return (
    <Link href={`/[preview]`} as={`/${data.inscriptionId}`} passHref>
      <div className=" cards ">
        <div className="w-full overflow-hidden object-contain">
          <img
            src={data?.imageUrl}
            alt="#2400"
            className="object-contain w-full"
          />
        </div>
        <div className="px-2 py-2">
          <p className="text-center text-xl">
            {data?.name.slice(data?.name.indexOf(" ") + 8)}
          </p>
        </div>
      </div>
    </Link>
  );
}
