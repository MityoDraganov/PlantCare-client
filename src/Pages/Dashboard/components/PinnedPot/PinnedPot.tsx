import { WaterTankCard } from "../../../../components/PotCards/WaterTankCard";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";

export const PinnedPot = () => {
  return (
    <Card className="w-full p-2 flex flex-col gap-4">
      <CardTitle className="pl-6">Pinned Pot</CardTitle>

      <CardContent>
        <WaterTankCard percentageFull={78}/>
      </CardContent>
    </Card>
  );
};
