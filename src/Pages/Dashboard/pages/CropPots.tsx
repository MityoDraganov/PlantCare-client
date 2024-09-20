import { useContext } from "react";
import { CropPotResponseDto } from "../../../dtos/CropPot.dto";

import { PotContext } from "../../../contexts/PotContext";
import { PotCard } from "../../../components/PotCards/PotCard/PotCard";
import { Card } from "../../../components/ui/card";

export const CropPots = () => {
	const { cropPots } = useContext(PotContext);

	return (
		<Card className="h-full w-full flex flex-col gap-2 py-4 px-2">
			<h2 className="text-xl pl-2 font-medium">Crop pots:</h2>
			<div className="h-full w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
				{cropPots?.length ? (
					cropPots.map((x: CropPotResponseDto) => (
						<PotCard {...x} key={x.id} />
					))
				) : (
					<p>No pots available</p>
				)}
			</div>
		</Card>
	);
};
