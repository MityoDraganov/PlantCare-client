import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";

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
        <div className="w-[15%] h-full bg-white border-r shadow-sm p-2">
          <PanelLeftClose
            onClick={toggleOpen}
            className="mr-0 ml-auto text-muted-foreground hover:text-black"
          />
          <p>test</p>
        </div>
      )}
    </>
  );
};
