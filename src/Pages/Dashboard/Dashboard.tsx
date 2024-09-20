
import { PinnedPot } from "./components/PinnedPot/PinnedPot";

import { CropPots } from "./pages/CropPots";

export const Dashboard = () => {
	return (
		<div className="flex flex-col w-full h-max p-4 gap-4">
            <CropPots />


			<PinnedPot />
		</div>
	);
};
