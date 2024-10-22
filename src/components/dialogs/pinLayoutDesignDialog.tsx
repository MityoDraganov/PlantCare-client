import { BatteryLevelCard } from "../PotCards/cards/BatteryLevelCard";
import { CustomCard } from "../PotCards/cards/CustomCard";
import { PotGalleryCard } from "../PotCards/cards/PotGalleryCard";
import { TemperatureCard } from "../PotCards/cards/TemperatureCard";
import { WaterTankCard } from "../PotCards/cards/WaterTankCard";
import { DialogContent } from "../ui/dialog";

export const PinLayoutDesignDialog = () => {
	return (
		<DialogContent className="w-[95%] h-[95%] grid grid-cols-4">
			<div className="col-span-1 border-r h-full">
				<p>Components:</p>
				<div className="grid grid-cols-2 gap-2">
					<WaterTankCard  />
					<TemperatureCard />
					<BatteryLevelCard />
					<PotGalleryCard />
                    <CustomCard />
				</div>
			</div>

			<div className="col-span-2 border-r h-full"></div>

			<div className="col-span-1 h-full">
				<p>Card properties:</p>
			</div>
		</DialogContent>
	);
};
