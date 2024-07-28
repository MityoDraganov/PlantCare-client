import { useState } from "react";
import { PotsSelect } from "./components/PotsSelect";
import { Sidebar } from "./components/SIdebar/Sidebar";
import { PanelLeftOpen } from "lucide-react";
import { PinnedPot } from "./components/PinnedPot/PinnedPot";

export const Dashboard = () => {
  return (
    <div className="w-full h-full flex">
      <Sidebar />

      <div className="flex flex-col w-full h-full p-4">
        <PotsSelect />

        <PinnedPot />
      </div>
    </div>
  );
};
