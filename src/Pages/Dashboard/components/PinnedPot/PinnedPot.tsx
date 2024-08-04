import { Pin } from "lucide-react";
import { BatteryLevelCard } from "../../../../components/PotCards/cards/BatteryLevelCard";
import { PotGalleryCard } from "../../../../components/PotCards/cards/PotGalleryCard";
import { TemperatureCard } from "../../../../components/PotCards/cards/TemperatureCard";
import { WaterTankCard } from "../../../../components/PotCards/cards/WaterTankCard";
import { Chart, ChartDataTypes } from "../../../../components/PotCards/Chart";
import { PhotoCard } from "../../../../components/PotCards/PhotoCard";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";

export const PinnedPot = () => {
  return (
    <Card className="w-full min-h-[75%] p-2 pb-4 flex flex-col  gap-4">
      <CardTitle className="pl-6 flex gap-1"><Pin className="fill-[#F9E400] hover:cursor-pointer"/>Pinned Pot</CardTitle>

      <CardContent className="flex w-full h-full gap-2 justify-between">
        <div className="flex w-[60%] h-full flex-col gap-4">
          <div className="flex gap-4">
            <WaterTankCard percentageFull={78} />
            <TemperatureCard potTemperature={25} />
            <BatteryLevelCard percentageCharged={99} />
            <PotGalleryCard />
          </div>

          <Chart/>
        </div>

        <div className="w-1/3 aspect-square">
          <PhotoCard
            imgUrl={
              "https://www.thompson-morgan.com/static-images/tandm/static-articles/top-10-crops-pots/20220324_tm_mint_container.jpg"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
