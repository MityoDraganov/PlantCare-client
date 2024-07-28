import { Beaker } from "lucide-react";
import { InfoCard } from "../InfoCard";

export const WaterTankCard = ({ percentageFull }: { percentageFull: number }) => {
  return (  
    <InfoCard
      icon={<Beaker />}
      title="Water tank"
      mainContent={
        <span className="flex gap-1">
          <span>{percentageFull.toFixed(1)}</span>
          <span>%</span>
        </span>
      }
      subContent="capacity: 1000L"
    />
  );
};