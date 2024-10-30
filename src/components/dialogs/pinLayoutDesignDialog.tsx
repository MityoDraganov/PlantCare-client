import { useState } from "react";
import {
	Draggable,
	Droppable,
	DragDropContext,
	DropResult,
} from "@hello-pangea/dnd";
import { CustomCard } from "../PotCards/cards/CustomCard";
import { PotGalleryCard } from "../PotCards/cards/PotGalleryCard";
import { TemperatureCard } from "../PotCards/cards/TemperatureCard";
import { WaterTankCard } from "../PotCards/cards/WaterTankCard";
import { DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { CropPotResponseDto } from "../../dtos/CropPot.dto";

// Define a type for card components
interface CardType {
	id: string;
	component: React.ElementType;
	width: number; // Grid columns the card occupies
	height: number; // Grid rows the card occupies
}

// Define the available cards
const availableCards: CardType[] = [
	{ id: "WaterTankCard", component: WaterTankCard, width: 1, height: 1 },
	{ id: "TemperatureCard", component: TemperatureCard, width: 1, height: 1 },
	{ id: "PotGalleryCard", component: PotGalleryCard, width: 1, height: 1 },
	{ id: "CustomCard", component: CustomCard, width: 1, height: 1 },
];

export const PinLayoutDesignDialog = ({ pot }: { pot: CropPotResponseDto }) => {
	const [droppedCards, setDroppedCards] = useState<CardType[]>([]);

	// Handle what happens when an item is dragged and dropped
	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// If there's no destination, do nothing
		if (!destination) {
			return;
		}

		// If the source and destination are the same, do nothing
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// Move from the left panel to the middle design area
		if (
			source.droppableId === "cardsList" &&
			destination.droppableId === "dropZone"
		) {
			const card = availableCards[source.index];
			setDroppedCards((prev) => [...prev, card]);
		}

		// Move from the middle design area back to the left panel
		if (
			source.droppableId === "dropZone" &&
			destination.droppableId === "cardsList"
		) {
			setDroppedCards((prev) =>
				prev.filter((_, i) => i !== source.index)
			);
		}
	};

	// Handle updating the card size manually (i.e., merging cells)
	const updateCardSize = (
		index: number,
		newWidth: number,
		newHeight: number
	) => {
		setDroppedCards((prevCards) =>
			prevCards.map((card, i) =>
				i === index
					? { ...card, width: newWidth, height: newHeight }
					: card
			)
		);
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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<DialogContent className="w-[95%] h-[95%] grid grid-cols-4">
				<Droppable droppableId="cardsList" direction="vertical">
					{(provided) => (
						<div
							className="col-span-1 border-r h-full p-4"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<p>Components:</p>
							<div className="grid grid-cols-2 gap-2">
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
												{/* Pass asChild={true} */}
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
					<p>Drop your cards here:</p>
					<Droppable droppableId="dropZone" direction="vertical">
						{(provided) => (
							<div
								className="col-span-2 border-r h-full p-4 auto-rows-[minmax(100px,auto)] gap-4"
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
														isInDesignerMode={true}
                                                        potSensors={pot.sensors}
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

				{/* Right panel: Properties */}
				<div className="col-span-1 h-full p-4">
					<p>Card properties:</p>
				</div>
			</DialogContent>
		</DragDropContext>
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
