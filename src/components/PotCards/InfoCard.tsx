import { ReactNode } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

interface InfoCardProps {
  icon?: ReactNode;
  title?: string;
  mainContent: ReactNode;
  subContent?: ReactNode;
  className?: string; 
}

export const InfoCard = ({
  icon,
  title,
  mainContent,
  subContent,
  className
}: InfoCardProps) => {
  return (
    <Card className={cn("w-[25%] flex flex-col items-center gap-4 pt-2", className)}>
      <CardTitle className="text-sm flex items-center gap-1">
        {icon}
        <p>{title}</p>
      </CardTitle>
      <CardContent className="flex flex-col h-full justify-between items-center gap-0 font-mono">
        <span className="font-extrabold text-2xl">{mainContent}</span>
        <span className="uppercase text-xs">{subContent}</span>
      </CardContent>
    </Card>
  );
};