import { PaintbrushVertical, Pin } from "lucide-react";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";
import { useContext } from "react";
import { WaterTankCard } from "../../../../components/PotCards/cards/WaterTankCard";
import { TemperatureCard } from "../../../../components/PotCards/cards/TemperatureCard";
import { PotGalleryCard } from "../../../../components/PotCards/cards/PotGalleryCard";
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
import { CardID, CardType } from "../../../../Interfaces/PinnedCards.interface";
import { CustomCard } from "../../../../components/PotCards/cards/CustomCard";
import { useTranslation } from "react-i18next";

interface GridPosition {
	rowStart: number;
	colStart: number;
}

type GridOccupiedMap = { [key: string]: boolean };

export const PinnedPots = () => {
	const { t } = useTranslation();
	const { cropPots, updatePotDataHandler } = useContext(PotContext);

	const pinnedPots = cropPots ? cropPots.filter((pot) => pot.isPinned) : [];
	console.log(pinnedPots);
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

	const findNextAvailablePosition = (
		grid: GridOccupiedMap,
		width: number,
		height: number
	): GridPosition => {
		let row = 1;
		let column = 1;

		while (true) {
			let fits = true;

			// Check if the space starting at (row, column) can fit the card
			for (let r = row; r < row + height; r++) {
				for (let c = column; c < column + width; c++) {
					if (grid[`${r}-${c}`]) {
						fits = false;
						break;
					}
				}
				if (!fits) break;
			}

			if (fits) {
				// Mark the grid cells as occupied
				for (let r = row; r < row + height; r++) {
					for (let c = column; c < column + width; c++) {
						grid[`${r}-${c}`] = true;
					}
				}
				return { rowStart: row, colStart: column };
			}

			// Move to the next column or row
			column++;
			if (column > 3) {
				// Assuming 3 columns in the grid
				column = 1;
				row++;
			}
		}
	};

	const renderCardContent = (card: CardType, value?: number, sensorAlias?: string) => {
		switch (card.type) {
			case CardID.WaterTankCard:
				return <WaterTankCard percentageFull={value} sensorAlias={sensorAlias}/>;
			case CardID.TemperatureCard:
				return <TemperatureCard potTemperature={value} sensorAlias={sensorAlias}/>;
			case CardID.PotGalleryCard:
				return <PotGalleryCard sensorAlias={sensorAlias}/>;
			case CardID.CustomCard:
				return (
					<CustomCard
						title={card.title}
						icon={card.icon}
						onSelectIcon={() => {}}
						selectedIcon="Hammer"
						value={value}
						sensorAlias={sensorAlias}
					/>
				);
			default:
				return null;
		}
	};

	const renderCard = (
		card: CardType,
		grid: GridOccupiedMap,
		value?: number,
		sensorAlias?: string
	) => {
		const { rowStart, colStart } = findNextAvailablePosition(
			grid,
			card.width,
			card.height
		);

		return (
			<div
				key={card.id}
				style={{
					gridColumnStart: colStart,
					gridRowStart: rowStart,
					gridColumnEnd: `span ${card.width}`,
					gridRowEnd: `span ${card.height}`,
				}}
			>
				{renderCardContent(card, value, sensorAlias)}
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-4 h-full overflow-y-auto">
			{pinnedPots.map((x) => (
				<Card
					className="w-full lg:h-1/5 p-2 pb-4 flex flex-col gap-4"
					key={x.id}
				>
					<CardTitle className="pl-6 flex justify-between w-full pr-1 pt-2">
						{t("dashboard.pinnedPot")}
						<div className="flex gap-2">
							<TooltipProvider>
								<Dialog>
									<DialogTrigger>
										<Tooltip>
											<TooltipTrigger>
												<PaintbrushVertical className="hover:rotate-12 duration-200" />
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{t(
														"dashboard.tooltip.designLayout"
													)}
												</p>
											</TooltipContent>
										</Tooltip>
									</DialogTrigger>
									<PinLayoutDesignDialog pot={x} />
								</Dialog>

								<Tooltip>
									<TooltipTrigger>
										<Pin
											className="hover:cursor-pointer hover:rotate-12 duration-200"
											onClick={() =>
												unpinPotHandler(x.id)
											}
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p>{t("dashboard.tooltip.unpin")}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</CardTitle>

					<CardContent className="flex flex-col lg:flex-row w-full lg:h-3/4 gap-2 justify-between">
						<div className="grid grid-cols-3 grid-rows-3 h-full lg:h-1/3 w-full gap-2 relative">
							{x.canvas.pinnedCards &&
							x.canvas.pinnedCards?.length > 0 ? (
								(() => {
									const grid: GridOccupiedMap = {};
									console.log(x.canvas.pinnedCards);
									return x.canvas.pinnedCards.map((card) => {
										const sensor = pinnedPots
											.flatMap((pot) => pot.sensors)
											.find(
												(sensor) =>
													sensor.id === card.sensorId
											);
										if (!sensor || !sensor.measurements)
											return null;
										const value =
											sensor.measurements[
												sensor.measurements.length - 1
											]?.value;
										const sensorAlias = sensor.alias ? sensor.alias : sensor.serialNumber;
										return renderCard(card, grid, value, sensorAlias);
									});
								})()
							) : (
								<p>
									{t("dashboard.noPinnedCards")}
								</p>
							)}
						</div>
					</CardContent>
				</Card>
			))}

			<Dialog>
				<DialogTrigger>
					<Card className="w-full lg:h-1/4 p-6 flex flex-col items-center justify-center text-xl hover:bg-primary-foreground hover:cursor-pointer">
						{t("dashboard.pinPot")}
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
