import { useState } from "react";
import { PotsSelect } from "./components/PotsSelect";
import { Sidebar } from "./components/SIdebar/Sidebar";
import { PanelLeftOpen } from "lucide-react";
import { PinnedPot } from "./components/PinnedPot/PinnedPot";

export const Dashboard = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <Sidebar />

      <div className="flex flex-col w-full h-full">
        <PotsSelect />

        <PinnedPot />
      </div>
    </div>
  );
};
