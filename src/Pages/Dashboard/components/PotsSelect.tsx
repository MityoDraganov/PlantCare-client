import { Card } from "../../../components/ui/card";
import { AddPotPlaceholder } from "./AddPotPlaceholder";

export const PotsSelect = () => {
	return (
		<Card className="flex gap-4 overflow-auto w-full h-max py-2 pl-2 pr-10">
			<AddPotPlaceholder />
		</Card>
	);
};
