import { Beaker } from "lucide-react";
import { InfoCard, InfoCardProps } from "./InfoCard";
import { useTranslation } from "react-i18next";

interface WaterTankCardProps extends InfoCardProps {
  percentageFull?: number;
}


export const WaterTankCard = ({ percentageFull, ...props }: WaterTankCardProps) => {
  const { t } = useTranslation();
  return (  
    <InfoCard
      icon={<Beaker />}
      title={t('pinCards.waterTank.title')}
      mainContent={
        <span className="flex gap-1">
          <span>{percentageFull?.toFixed(1)}</span>
          <span>%</span>
        </span>
      }
      {...props}
    />
  );
};