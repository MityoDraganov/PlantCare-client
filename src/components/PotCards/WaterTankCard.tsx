import { Beaker } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";

export const WaterTankCard = ({
  percentageFull,
}: {
  percentageFull: number;
}) => {
  return (
    <Card className="w-[15%] flex flex-col justify-center items-center gap-4 pt-2">
      <CardTitle className="text-sm flex items-center">
        <Beaker />
        <p>Water tank</p>
      </CardTitle>
      <CardContent className="flex flex-col justify-center items-center gap-0 text-lg font-mono">
        <span className="font-extrabold text-2xl">
          <span className="flex gap-1">
            <span>{percentageFull.toFixed(1)}</span>
            <span>%</span>
          </span>
        </span>{" "}
        <span className="uppercase">full</span>
      </CardContent>
    </Card>
  );
};
