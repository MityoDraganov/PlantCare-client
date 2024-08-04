import { SignedIn, UserButton } from "@clerk/clerk-react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const toggleOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {!isSidebarOpen ? (
        <div className="ml-2 pt-2 pr-1 h-full border-r">
          <PanelLeftOpen
            onClick={() => setIsSidebarOpen(true)}
            className="text-muted-foreground hover:text-black"
          />
        </div>
      ) : (
        <div className="w-[15%] h-[100dvh] bg-white border-r shadow-sm p-2">
          <PanelLeftClose
            onClick={toggleOpen}
            className="mr-0 ml-auto text-muted-foreground hover:text-black"
          />

          <div className="flex flex-col h-full justify-between pb-10">
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};
