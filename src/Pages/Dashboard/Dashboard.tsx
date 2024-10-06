
import { useContext } from "react";
import { PinnedPot } from "./components/PinnedPot/PinnedPot";

import { CropPots } from "./pages/CropPots";
import { PotContext } from "../../contexts/PotContext";

export const Dashboard = () => {
	const { cropPots } = useContext(PotContext);
	console.log(cropPots);
	
	return (
		<div className="flex flex-col w-full h-max p-4 gap-4">
            <CropPots cropPots={cropPots}/>


			<PinnedPot />
		</div>
	);
};
