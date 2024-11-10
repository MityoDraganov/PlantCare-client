
import { useContext } from "react";
import { PinnedPots } from "./components/PinnedPot/PinnedPot";

import { CropPots } from "./pages/CropPots";
import { PotContext } from "../../contexts/PotContext";

export const Dashboard = () => {
	const { cropPots } = useContext(PotContext);
	
	return (
		<div className="flex flex-col w-full h-max p-4 gap-4">
            <CropPots cropPots={cropPots}/>
			<PinnedPots />
		</div>
	);
};
