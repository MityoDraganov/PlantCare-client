export enum CardID {
	WaterTankCard = "WaterTankCard",
	TemperatureCard = "TemperatureCard",
	PotGalleryCard = "PotGalleryCard",
	CustomCard = "CustomCard",
  }

export interface CardType {
	id: string;
	component: React.ElementType;
	width: number; // Grid columns the card occupies
	height: number; // Grid rows the card occupies
	startLocation: number; // Track starting location
	title?: string;
	icon?: string;
	sensorId?: number;
	type: CardID;
}

