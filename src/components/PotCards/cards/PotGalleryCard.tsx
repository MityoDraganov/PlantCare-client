import { ChevronRight, Images } from "lucide-react";
import { InfoCard } from "./InfoCard";

export const PotGalleryCard = () => {
  return (  
    <InfoCard
      className="hover:bg-primary-foreground hover:cursor-pointer"
      mainContent={
        <span className="flex flex-col justify-center items-center gap-1">
            <Images size={46}/>
            <p className="text-sm text-center flex gap-0 items-center justify-center p-0"><span className="w-fit p-0">Explore gallery</span><span><ChevronRight /></span></p>
        </span>
      }
    />
  );
};