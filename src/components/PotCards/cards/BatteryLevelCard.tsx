import { BatteryMedium } from "lucide-react";
import { InfoCard, InfoCardProps } from "./InfoCard";

interface BatteryLevelCardProps extends InfoCardProps {
	percentageCharged?: number;
}

export const BatteryLevelCard = ({ percentageCharged, ...props }: BatteryLevelCardProps) => {
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
      {...props}
    />
  );
};