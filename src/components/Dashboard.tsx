"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Posts from "@/components/Posts";
import { EPostFilter } from "@/enums/EPostFilter";

const Dashboard = () => {
const [filter, setFilter] = useState<EPostFilter>(EPostFilter.NewToday);

  return (
    <div className="min-h-screen relative p-6 bg-gradient-to-br from-black via-amber-500 to-black animate-gradient bg-[length:400%_400%]">
      <NavBar filter={filter} setFilter={setFilter} />
      <Posts filter={filter} />
    </div>
  );
};

export default Dashboard;
