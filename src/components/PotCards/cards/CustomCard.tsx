
import { Hammer } from "lucide-react";
import { InfoCard, InfoCardProps } from "./InfoCard";

export const CustomCard = ({...props} : InfoCardProps) => {
  return (  
    <InfoCard
      icon={<Hammer />}
      title="Custom card"
      {...props}
    />
  );
};