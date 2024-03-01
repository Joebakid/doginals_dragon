"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";

export default function Preview({ params: preview }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(false);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");

        const json = await res.json();

        setData(json);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const item = data?.find((d) => d.inscriptionId === preview.preview);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(item.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <section className="">
      <div className="container mx-auto px-4 pt-2 bg-gree-300">
        <div
          onClick={goBack}
          className=" mb-2 flex items-center space-x-2 mt-2 lg:text-xl lg:mt-5 cursor-pointer"
        >
          <MdKeyboardBackspace size={24} />
          <span>Back</span>
        </div>
        <div className=" min-h-[80vh] lg:min-h-[75vh] max-w-md lg:max-w-full b-red-300 mx-auto lg:flex mt-5 lg:mt-10">
          <div className="w-full lg:w-1/2 overflow-hidden object-contain">
            <img
              src={item?.imageUrl}
              alt="#2400"
              className="object-contain w-full"
            />
          </div>
          <div className="px-2 py-2 flex-1 max-w-[400px] flex flex-col items-cnter mx-auto ">
            <div className="lg:flex lg:justify-between items-center">
              <p className="text-center lg:text-start text-xl">{item?.name}</p>
              <div className="flex justify-center lg:justify-start">
                {item && (
                  <button
                    onClick={handleCopyClick}
                    className={`${
                      copied ? "bg-secTransparent" : "primary-gradient"
                    }  my-2  rounded-lg px-2 py-1 text-xs hover:scale-[0.95] duration-150 active:scale-100`}
                  >
                    {copied ? "Copied" : "Copy Inscription ID"}
                  </button>
                )}
              </div>
            </div>
            <p className="text-center text-sm overflow-auto hide-scroll mt-2">
              {item?.inscriptionId}
            </p>
            {/* <div className="text-center text-sm hidden lg:block">
              {item?.inscriptionId}
            </div> */}
            <div className="mt-2 flex justify-center flex-col ">
              <div className="flex justify-between items-center text-yellow-500 text-sm font-semibold mb-1">
                <div>Traits</div>
                <div>Value</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Rank</div>
                <div>{item?.attributes.rank}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Wings</div>
                <div>{item?.attributes.wings}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Neck</div>
                <div>{item?.attributes.neck}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Mouth</div>
                <div>{item?.attributes.mouth}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Shirt</div>
                <div>{item?.attributes.shirt}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Eye</div>
                <div>{item?.attributes.eye}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
