import { PaintbrushVertical, Pin } from "lucide-react";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";
import { useContext } from "react";
import { WaterTankCard } from "../../../../components/PotCards/cards/WaterTankCard";
import { TemperatureCard } from "../../../../components/PotCards/cards/TemperatureCard";
import { BatteryLevelCard } from "../../../../components/PotCards/cards/BatteryLevelCard";
import { PotGalleryCard } from "../../../../components/PotCards/cards/PotGalleryCard";
import { Chart } from "../../../../components/PotCards/cards/Chart";
import { PhotoCard } from "../../../../components/PotCards/cards/PhotoCard";
import { PotContext } from "../../../../contexts/PotContext";
import { updatePot } from "../../../../api/requests";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../../../../components/ui/dialog";
import { CropPots, layoutOptions } from "../../pages/CropPots";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../../../components/ui/tooltip";
import { PinLayoutDesignDialog } from "../../../../components/dialogs/pinLayoutDesignDialog";

export const PinnedPot = () => {
	const { cropPots, updatePotDataHandler } = useContext(PotContext);

	const pinnedPots = cropPots ? cropPots.filter((pot) => pot.isPinned) : [];
	const nonPinnedPots = cropPots
		? cropPots.filter((pot) => !pot.isPinned)
		: [];

	const pinPotHandler = async (potId: number) => {
		const pot = cropPots?.find((x) => x.id === potId);
		if (!pot) {
			return;
		}
		await updatePot(potId, { ...pot, isPinned: true });
		updatePotDataHandler({ ...pot, isPinned: true });
	};

	const unpinPotHandler = async (potId: number) => {
		const pot = cropPots?.find((x) => x.id === potId);
		if (!pot) {
			return;
		}
		await updatePot(potId, { ...pot, isPinned: false });
		updatePotDataHandler({ ...pot, isPinned: false });
	};

	return (
		<div className="flex flex-col">
			{pinnedPots.map((x) => (
				<Card className="w-full lg:h-1/4 p-2 pb-4 flex flex-col gap-4">
					<CardTitle className="pl-6 flex justify-between w-full pr-1 pt-2">
						Pinned Pot
						<div className="flex gap-2">
							<TooltipProvider>
								<Dialog>
									<DialogTrigger>
										<Tooltip>
											<TooltipTrigger>
												<PaintbrushVertical className="hover:rotate-12 duration-200" />
											</TooltipTrigger>
											<TooltipContent>
												<p>Design pinned layout</p>
											</TooltipContent>
										</Tooltip>
									</DialogTrigger>
									<PinLayoutDesignDialog />
								</Dialog>

								<Tooltip>
									<TooltipTrigger>
										<Pin
											className="fill-[#F9E400] hover:cursor-pointer hover:rotate-12 duration-200"
											onClick={() =>
												unpinPotHandler(x.id)
											}
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p>Unpin pot</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</CardTitle>

					<CardContent className="flex flex-col lg:flex-row w-full lg:h-3/4 gap-2 justify-between">
						<div className="flex w-full lg:w-[60%] lg:h-1/3 flex-col gap-4">
							<div className="flex flex-col lg:flex-row gap-4">
								<WaterTankCard percentageFull={78} />
								<TemperatureCard potTemperature={25} />
								<BatteryLevelCard percentageCharged={99} />
								<PotGalleryCard />
							</div>

							<div className="lg:h-[40dvh]">
								<Chart sensors={x.sensors} />
							</div>
						</div>

						<div className="w-full lg:w-1/3 aspect-square">
							<PhotoCard
								imgUrl={
									"https://www.thompson-morgan.com/static-images/tandm/static-articles/top-10-crops-pots/20220324_tm_mint_container.jpg"
								}
							/>
						</div>
					</CardContent>
				</Card>
			))}

			<Dialog>
				<DialogTrigger>
					<Card className="w-full lg:h-1/4 p-6 flex flex-col items-center justify-center text-xl hover:bg-primary-foreground hover:cursor-pointer">
						<h2>Pin pot</h2>
					</Card>
				</DialogTrigger>
				<DialogContent className="w-[95%]">
					<DialogTitle>Select pot to pin</DialogTitle>
					<CropPots
						cropPots={nonPinnedPots}
						layout={layoutOptions.component}
						action={pinPotHandler}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};
