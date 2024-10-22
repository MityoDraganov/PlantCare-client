import { BatteryMedium } from "lucide-react";
import { InfoCard } from "./InfoCard";

export const BatteryLevelCard = ({ percentageCharged }: { percentageCharged?: number }) => {
  return (  
    <InfoCard
      icon={<BatteryMedium className="-rotate-90"/>}
      title="Battery charge"
      mainContent={
        <span className="flex gap-1">
          <span>{percentageCharged?.toFixed(1)}</span>
          <span>%</span>
        </span>
      }
    />
  );
};