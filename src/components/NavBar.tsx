"use client";
import React from "react";
import Image from "next/image";
import { EPostFilter } from "@/enums/EPostFilter";

interface NavBarProps {
  filter: EPostFilter;
  setFilter: (value: EPostFilter) => void;
}

const NavBar = ({ filter, setFilter }: NavBarProps) => {
  return (
    <nav className="w-full mb-6 mx-auto bg-gray-800/5 backdrop-blur-lg sticky top-4 z-10 rounded-xl md:rounded-full ring-1 ring-amber-200/20 px-4 py-4">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <a
          href="https://www.twocents.money/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3"
        >
          <Image
            src="/assets/images/coins-logo.png"
            alt="twocents app logo"
            width={48}
            height={48}
            className="w-12"
            priority
          />
          <h1 className="text-2xl font-bold text-white">twocents</h1>
        </a>

        <div className="relative w-fit">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as EPostFilter)}
            className="appearance-none bg-amber-600/80 text-white text-sm font-semibold px-4 pr-10 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-amber-600/80"
          >
            <option value={EPostFilter.NewToday}>New Today</option>
            <option value={EPostFilter.TopToday}>Top Today</option>
            <option value={EPostFilter.TopAllTime}>Top All Time</option>
          </select>


          <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-base">
            expand_more
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
