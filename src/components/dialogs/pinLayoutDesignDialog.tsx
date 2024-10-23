import { useState } from "react";
import {
	Draggable,
	Droppable,
	DragDropContext,
	DropResult,
} from "@hello-pangea/dnd";
import { BatteryLevelCard } from "../PotCards/cards/BatteryLevelCard";
import { CustomCard } from "../PotCards/cards/CustomCard";
import { PotGalleryCard } from "../PotCards/cards/PotGalleryCard";
import { TemperatureCard } from "../PotCards/cards/TemperatureCard";
import { WaterTankCard } from "../PotCards/cards/WaterTankCard";
import { DialogContent } from "../ui/dialog";

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
	{
		id: "BatteryLevelCard",
		component: BatteryLevelCard,
		width: 1,
		height: 1,
	},
	{ id: "PotGalleryCard", component: PotGalleryCard, width: 1, height: 1 },
	{ id: "CustomCard", component: CustomCard, width: 1, height: 1 },
];

export const PinLayoutDesignDialog = () => {
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
			const card = droppedCards[source.index];
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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<DialogContent className="w-[95%] h-[95%] grid grid-cols-4">
				{/* Left panel: Draggable components */}
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
												<card.component />
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
													className="border p-2 rounded-lg"
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
													<card.component />
													{/* Buttons to enlarge the card */}
													<div className="flex mt-2">
														<button
															className="border p-1 m-1"
															onClick={() =>
																updateCardSize(
																	index,
																	1,
																	1
																)
															}
														>
															1x1
														</button>
														<button
															className="border p-1 m-1"
															onClick={() =>
																updateCardSize(
																	index,
																	2,
																	2
																)
															}
														>
															2x2
														</button>
														<button
															className="border p-1 m-1"
															onClick={() =>
																updateCardSize(
																	index,
																	3,
																	3
																)
															}
														>
															3x3
														</button>
													</div>
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
