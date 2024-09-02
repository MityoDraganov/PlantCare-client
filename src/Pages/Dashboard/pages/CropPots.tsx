import { useContext } from "react";
import { CropPotResponseDto } from "../../../dtos/CropPot.dto";

import { PotContext } from "../../../contexts/potContext";
import { PotCard } from "../../../components/PotCards/PotCard/PotCard";

export const CropPots = () => {
	const {cropPots, selectedPot} = useContext(PotContext)

	return (
		<div className="h-full w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
			{cropPots?.length ? cropPots.map((x: CropPotResponseDto) => <PotCard {...x} key={x.id}/>) : <p>No pots available</p>}
			
			
		</div>
	);
};
