"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import Image from "next/image";

export default function Header() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
    // console.log('working');
  };

  return (
    <header className="fixed left-0 right-0 top-0 primary-gradient h-12 z-[1000]">
      <div className="relative container mx-auto px-4 h-full flex items-center justify-between">
        <div className="font-medium">
          <Link href="#">
            <div className="w-8 h-8 object-cover overflow-hidden rounded-full">
              <Image
                src="/images/logo.jpeg"
                height={200}
                width={200}
                alt="logo"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        </div>
        <nav
          className={`${
            nav
              ? "translate-y-0 mt-12 opacity-100"
              : "opacity-0 -translate-y-full "
          } absolute bg-sec top-0 shadow-md left-0 right-0 duration-200 z-[50] lg:hidden`}
        >
          <ul
            onClick={openNav}
            className="px-4 pt-2 pb-4 flex flex-col space-y-2 font-medium"
          >
            <Link
              legacyBehavior
              target="_blank"
              href="https://t.me/DoginalsDragon"
            >
              <li className="flex items-center space-x-2">
                {" "}
                <FaTelegramPlane size={18} />
                <a>Telegram </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://x.com/DoginalsDragon?t=rxNKddrXdiY0jkpnezBb1Q&s=09"
            >
              <li className="flex items-center space-x-2">
                {" "}
                <BsTwitterX size={18} />
                <a>Twitter </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://discord.com/invite/jRmKF7RZ"
            >
              <li className="flex items-center space-x-2">
                {" "}
                <FaDiscord size={18} />
                <a>Discord </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://doggy.market/nfts/doginalsdragon"
            >
              <li className="flex items-center space-x-2">
                {" "}
                <FaShop size={18} />
                <a>Market </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://www.doginalsdragon.com/"
            >
              <li className="flex items-center space-x-2">
                {" "}
                <TbWorld size={18} />
                <a>Website </a>
              </li>
            </Link>
          </ul>
        </nav>
        <div onClick={openNav} className="lg:hidden bg-gren-700 text-white">
          <IoIosMenu size={30} stroke={2} />
        </div>

        {/* Desktop Nav */}

        <nav className="hidden lg:block">
          <ul className="flex space-x-10 text-lg">
            <Link
              legacyBehavior
              target="_blank"
              href="https://t.me/DoginalsDragon"
            >
              <li className="cursor-pointer flex items-center space-x-2">
                {" "}
                <FaTelegramPlane size={18} />
                <a>Telegram </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://x.com/DoginalsDragon?t=rxNKddrXdiY0jkpnezBb1Q&s=09"
            >
              <li className="cursor-pointer flex items-center space-x-2">
                {" "}
                <BsTwitterX size={18} />
                <a>Twitter </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://discord.com/invite/jRmKF7RZ"
            >
              <li className="cursor-pointer flex items-center space-x-2">
                {" "}
                <FaDiscord size={18} />
                <a>Discord </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://doggy.market/nfts/doginalsdragon"
            >
              <li className="cursor-pointer flex items-center space-x-2">
                {" "}
                <FaShop size={18} />
                <a>Market </a>
              </li>
            </Link>
            <Link
              legacyBehavior
              target="_blank"
              href="https://www.doginalsdragon.com/"
            >
              <li className="cursor-pointer flex items-center space-x-2">
                {" "}
                <TbWorld size={18} />
                <a>Website </a>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
