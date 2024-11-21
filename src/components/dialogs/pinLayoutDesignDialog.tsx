import { useEffect, useState } from "react";
import {
	Draggable,
	Droppable,
	DragDropContext,
	DropResult,
} from "@hello-pangea/dnd";
import { CustomCard, IconName } from "../PotCards/cards/CustomCard";
import { PotGalleryCard } from "../PotCards/cards/PotGalleryCard";
import { TemperatureCard } from "../PotCards/cards/TemperatureCard";
import { WaterTankCard } from "../PotCards/cards/WaterTankCard";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

import { EditBtnsComponent } from "../EditBtnsComponent";
import { CardID, CardType } from "../../Interfaces/PinnedCards.interface";
import { updateCanvas } from "../../api/requests";
import { CanvasDto } from "../../dtos/canvas.dto";
import { CropPotResponseDto } from "../../dtos/CropPot.dto";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PaintbrushVertical } from "lucide-react";

interface CustomCardFields {
	title: string;
	icon: string;
}

export const PinLayoutDesignDialog = ({ pot }: { pot: CropPotResponseDto }) => {
	const [droppedCards, setDroppedCards] = useState<CardType[]>([]);
	const [customCardData, setCustomCardData] = useState<CustomCardFields>({
		icon: "",
		title: "",
	});
	const [open, setOpen] = useState<boolean>(false);

	const { t } = useTranslation();

	const availableCards: CardType[] = [
		{
			id: "WaterTankCard",
			component: WaterTankCard,
			width: 1,
			height: 1,
			startLocation: 1,
			type: CardID.WaterTankCard,
		},
		{
			id: "TemperatureCard",
			component: TemperatureCard,
			width: 1,
			height: 1,
			startLocation: 1,
			type: CardID.TemperatureCard,
		},
		{
			id: "PotGalleryCard",
			component: PotGalleryCard,
			width: 1,
			height: 1,
			startLocation: 1,
			type: CardID.PotGalleryCard,
		},
		{
			id: "CustomCard",
			component: CustomCard,
			width: 1,
			height: 1,
			startLocation: 1,
			icon: customCardData.icon,
			title: customCardData.title,
			type: CardID.CustomCard,
		},
	];

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		// If the source and destination are the same, do nothing
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		// Move from the left panel to the middle design area
		if (
			source.droppableId === "cardsList" &&
			destination.droppableId === "dropZone"
		) {
			const card = availableCards[source.index];
			let newStartLocation = 1;

			// Check if there are any cards already placed
			if (droppedCards.length > 0) {
				// Track occupied grid cells
				let occupiedCells: Set<number> = new Set();
				droppedCards.forEach((c) => {
					// Mark cells the card occupies based on width and height
					for (let i = 0; i < c.width; i++) {
						for (let j = 0; j < c.height; j++) {
							occupiedCells.add(c.startLocation + i + j * 3); // 3 is grid width
						}
					}
				});

				// Try to find the next available location
				let foundSpot = false;
				for (let i = 1; i <= 9; i++) {
					// Adjust to fit your grid size
					if (!occupiedCells.has(i)) {
						newStartLocation = i;
						foundSpot = true;
						break;
					}
				}

				if (!foundSpot) {
					toast.error("No more space left in the grid");
					return;
				}
			}

			setDroppedCards((prev) => [
				...prev,
				{
					...card,
					startLocation: newStartLocation,
					instanceId: `${card.id}-${new Date().getTime()}`,
				},
			]);
		}

		if (
			source.droppableId === "dropZone" &&
			destination.droppableId === "cardsList"
		) {
			setDroppedCards((prev) =>
				prev.filter((_, i) => i !== source.index)
			);
		}
	};

	useEffect(() => {
		console.log(customCardData);
	}, [customCardData]);

	useEffect(() => {
		console.log(droppedCards);
	}, [droppedCards]);

	const GRID_SIZE = 3;

	function positionToCoords(position: number): { row: number; col: number } {
		const row = Math.floor((position - 1) / GRID_SIZE);
		const col = (position - 1) % GRID_SIZE;
		return { row, col };
	}

	const checkForEmptySpaces = (
		newWidth: number,
		newHeight: number,
		index: number
	) => {
		// Get the card to resize
		const cardToResize = droppedCards[index];
		const { startLocation } = cardToResize;

		// Convert the start position to (row, column)
		const { row: startRow, col: startCol } =
			positionToCoords(startLocation);

		// Get the area of the resized card
		const cardArea: { row: number; col: number }[] = [];
		for (let r = startRow; r < startRow + newHeight; r++) {
			for (let c = startCol; c < startCol + newWidth; c++) {
				// Ensure the card stays within the grid bounds
				if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
					return false; // Resize is out of bounds
				}
				cardArea.push({ row: r, col: c });
			}
		}

		// Check for overlap with existing cards
		for (const [i, card] of droppedCards.entries()) {
			if (i === index) continue; // Skip the card we're resizing

			const { startLocation: otherStartPosition, width, height } = card;
			const { row: otherStartRow, col: otherStartCol } =
				positionToCoords(otherStartPosition);
			const otherEndRow = otherStartRow + height;
			const otherEndCol = otherStartCol + width;

			// Check if any part of the resized card overlaps with any existing card
			for (const area of cardArea) {
				if (
					area.row >= otherStartRow &&
					area.row < otherEndRow &&
					area.col >= otherStartCol &&
					area.col < otherEndCol
				) {
					return false; // There is an overlap
				}
			}
		}

		// No overlap, resize is allowed
		return true;
	};

	const updateCardSize = (
		index: number,
		newWidth: number,
		newHeight: number
	) => {
		setDroppedCards((prevCards) =>
			prevCards.map((card, i) => {
				if (i === index) {
					if (checkForEmptySpaces(newWidth, newHeight, index)) {
						return { ...card, width: newWidth, height: newHeight };
					} else {
						toast.error("Not enough space to resize the card");
						return card; // Do not change the card size if no space
					}
				}
				return card;
			})
		);
	};

	const handleSensorSelect = (sensorId: number, instanceId: string) => {
		console.log(sensorId);

		const newDroppedCards = droppedCards.map((card) => {
			if (card.instanceId === instanceId) {
				card.sensorId = sensorId;
			}
			return card;
		});
		console.log(newDroppedCards);

		setDroppedCards(newDroppedCards);
	};

	// Create buttons on the edges for resizing
	const renderResizeButtons = (index: number, card: CardType) => {
		return (
			<>
				<div className="absolute right-0 top-1/2 transform -translate-y-1/2  opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
					<ResizeBtnsComponent
						card={card}
						index={index}
						updateCardSize={updateCardSize}
						type="width"
					/>
				</div>

				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-fit opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
					<ResizeBtnsComponent
						card={card}
						index={index}
						updateCardSize={updateCardSize}
						type="height"
					/>
				</div>
			</>
		);
	};

	const handleCancel = () => {
		setDroppedCards([]);
		setOpen(false);
	};

	const handleSave = async () => {
		const canvas: CanvasDto = {
			cropPotID: pot.id,
			pinnedCards: droppedCards,
		};
		await updateCanvas(canvas, pot.id);
		toast.success("Canvas updated successfully");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Tooltip>
					<TooltipTrigger>
						<PaintbrushVertical className="hover:rotate-12 duration-200" />
					</TooltipTrigger>
					<TooltipContent>
						<p>{t("dashboard.tooltip.designLayout")}</p>
					</TooltipContent>
				</Tooltip>
			</DialogTrigger>

			<DragDropContext onDragEnd={onDragEnd}>
				<DialogContent className="w-[95%] h-[95%] grid grid-cols-4">
					<Droppable droppableId="cardsList" direction="vertical">
						{(provided) => (
							<div
								className="col-span-1 border-r h-full p-4"
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<p>{t("pinLayout.components")}:</p>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
									{availableCards.map((card, index) => (
										<Draggable
											key={card.id}
											draggableId={card.id}
											index={index}
										>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className="border p-2 rounded-lg"
												>
													<card.component
														asChild={true}
													/>{" "}
												</div>
											)}
										</Draggable>
									))}
								</div>
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<div className="flex flex-col w-full h-full col-span-2">
						<p>{t("pinLayout.dropCards")}:</p>
						<Droppable droppableId="dropZone" mode="standard">
							{(provided) => (
								<div
									className="col-span-2 border-r h-full p-4  gap-4"
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<div className="grid grid-cols-3 grid-rows-3 gap-4 h-full">
										{droppedCards.map((card, index) => (
											<Draggable
												key={card.id}
												draggableId={card.id}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className="border p-2 rounded-lg relative group"
														style={{
															gridColumnEnd:
																card.width === 3
																	? "span 3"
																	: `span ${card.width}`,
															gridRowEnd: `span ${card.height}`,
															gridColumnStart:
																card.width === 3
																	? "1"
																	: "auto",
														}}
													>
														<card.component
															asChild={true}
															isInDesignerMode={
																true
															}
															potSensors={
																pot.sensors
															}
															onSensorSelect={
																handleSensorSelect
															}
															instanceId={
																card.instanceId
															}
															onTitleChange={(
																title: string
															) => {
																setCustomCardData(
																	(prev) => ({
																		...prev,
																		title,
																	})
																);
															}}
															onSelectIcon={(
																iconName: IconName
															) => {
																setCustomCardData(
																	(prev) => ({
																		...prev,
																		icon: iconName,
																	})
																);
															}}
														/>

														{renderResizeButtons(
															index,
															card
														)}
													</div>
												)}
											</Draggable>
										))}
									</div>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>

					<div className="col-span-1 h-full p-4 flex flex-col justify-between">
						<p>{t("pinLayout.cardProperties")}:</p>

						<p className="text-muted-foreground">
							{t("pinLayout.comingSoon")}...
						</p>

						<EditBtnsComponent
							cancelUpdate={handleCancel}
							saveUpdate={handleSave}
							isEditing={true}
						/>
					</div>
				</DialogContent>
			</DragDropContext>
		</Dialog>
	);
};

const ResizeBtnsComponent = ({
	card,
	index,
	updateCardSize,
	type,
}: {
	card: CardType;
	index: number;
	updateCardSize: (
		index: number,
		newWidth: number,
		newHeight: number
	) => void;
	type: "width" | "height";
}) => {
	return (
		<>
			{((type === "width" && card.width < 3) ||
				(type === "height" && card.height < 3)) && (
				<Button
					className="w-fit"
					variant="outline"
					onClick={() => {
						if (type === "height") {
							updateCardSize(index, card.width, card.height + 1);
							return;
						}
						updateCardSize(index, card.width + 1, card.height);
					}}
				>
					+
				</Button>
			)}
			{((type === "width" && card.width > 1) ||
				(type === "height" && card.height > 1)) && (
				<Button
					className="w-fit"
					variant="outline"
					onClick={() => {
						if (type === "height") {
							updateCardSize(index, card.width, card.height - 1);
							return;
						}
						updateCardSize(index, card.width - 1, card.height);
					}}
				>
					-
				</Button>
			)}
		</>
	);
};
