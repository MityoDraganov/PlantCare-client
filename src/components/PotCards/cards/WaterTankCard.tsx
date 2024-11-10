import { Beaker } from "lucide-react";
import { InfoCard, InfoCardProps } from "./InfoCard";

interface WaterTankCardProps extends InfoCardProps {
  percentageFull?: number;
}

const title = "Water tank";

export const WaterTankCard = ({ percentageFull, ...props }: WaterTankCardProps) => {
  return (  
    <InfoCard
      icon={<Beaker />}
      title={title}
      mainContent={
        <span className="flex gap-1">
          <span>{percentageFull?.toFixed(1)}</span>
          <span>%</span>
        </span>
      }
      subContent="capacity: 1000L"
      {...props}
    />
  );
};

WaterTankCard.getIcon = () => "Beaker";
WaterTankCard.getTitle = () => title;