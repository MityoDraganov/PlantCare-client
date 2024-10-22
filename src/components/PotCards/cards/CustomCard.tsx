
import { Hammer } from "lucide-react";
import { InfoCard } from "./InfoCard";

export const CustomCard = () => {
  return (  
    <InfoCard
      icon={<Hammer />}
      title="Custom card"
    />
  );
};