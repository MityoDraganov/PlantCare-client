import { CropPotResponseDto } from "../../../dtos/CropPot.dto";
import { PotCard } from "../../../components/PotCards/PotCard/PotCard";
import { Card } from "../../../components/ui/card";

export enum layoutOptions {
	page,
	component,
}

export const CropPots = ({
	cropPots,
	layout = layoutOptions.page,
	action
}: {
	cropPots: CropPotResponseDto[] | null;
	layout?: layoutOptions;
	action?: Function;
}) => {
	return (
		<Card className="h-full w-full flex flex-col gap-2 py-4 px-2">
			{layout === layoutOptions.page && (
				<h2 className="text-xl pl-2 font-medium">Crop pots:</h2>
			)}
			<div className="h-full w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
				{cropPots?.length ? (
					cropPots.map((x: CropPotResponseDto) => (
						<PotCard key={x.id} pot={x} layout={layout} action={action}/>
					))
				) : (
					<p>No pots available</p>
				)}
			</div>
		</Card>
	);
};
