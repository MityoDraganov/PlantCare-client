import { Pin } from "lucide-react";
import { BatteryLevelCard } from "../../../../components/PotCards/cards/BatteryLevelCard";
import { PotGalleryCard } from "../../../../components/PotCards/cards/PotGalleryCard";
import { TemperatureCard } from "../../../../components/PotCards/cards/TemperatureCard";
import { WaterTankCard } from "../../../../components/PotCards/cards/WaterTankCard";
import { Chart } from "../../../../components/PotCards/cards/Chart";
import { PhotoCard } from "../../../../components/PotCards/cards/PhotoCard";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";
import { useEffect, useState } from "react";
import { CropPotResponseDto } from "../../../../dtos/CropPot.dto";
import { getAllPots } from "../../../../api/requests";
import toast from "react-hot-toast";

export const PinnedPot = () => {
	const [pots, setPots] = useState<CropPotResponseDto[]>();

	useEffect(() => {
		(async () => {
			try {
				const data = await getAllPots();
				console.log(data);

				setPots(data);
			} catch (err) {
				toast.error("Failed to fetch pots.");
				console.error(err);
			}
		})();
	}, []);

	return (
		<Card className="w-full min-h-[75%] p-2 pb-4 flex flex-col  gap-4">
			<CardTitle className="pl-6 flex gap-1">
				<Pin className="fill-[#F9E400] hover:cursor-pointer" />
				Pinned Pot
			</CardTitle>

			<CardContent className="flex w-full h-full gap-2 justify-between">
				<div className="flex w-[60%] h-full flex-col gap-4">
					<div className="flex gap-4">
						<WaterTankCard percentageFull={78} />
						<TemperatureCard potTemperature={25} />
						<BatteryLevelCard percentageCharged={99} />
						<PotGalleryCard />
					</div>
					{pots?.length && <Chart sensorData={pots[0].sensorData} />}
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
