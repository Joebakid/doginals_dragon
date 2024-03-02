"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";

export default function Card({ data, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data?.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <>
      <div className=" cards  ">
        <Link href={`/[preview]`} as={`/${data.inscriptionId}`} passHref>
          <div className="px-2 py-2">
            <p className="text-center text-xl">
              {data?.name.slice(data?.name.indexOf(" ") + 8)}
              {/* {data?.name} */}
            </p>
          </div>
          <div className="w-full overflow-hidden object-contain">
            <img
              src={data?.imageUrl}
              alt="#2400"
              className="object-contain w-full"
            />
          </div>
        </Link>
        <div className="flex justify-center lg:justify-start my-1">
          {data && (
            <button
              onClick={handleCopyClick}
              className={`${
                copied ? "bg-secTransparent" : "primary-gradient"
              }  my-2  rounded-lg px-2 py-1 text-sm hover:scale-[0.95] duration-150 active:scale-100`}
            >
              {copied ? "Copied" : "Copy ID"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
