import { SensorDto } from "../dtos/sensors.dto";

export enum CardID {
	WaterTankCard = "WaterTankCard",
	TemperatureCard = "TemperatureCard",
	PotGalleryCard = "PotGalleryCard",
	CustomCard = "CustomCard",
  }

export interface CardType {
	id: string;
	instanceId?: string;
	component: React.ElementType;
	width: number; // Grid columns the card occupies
	height: number; // Grid rows the card occupies
	startLocation: number; // Track starting location
	title?: string;
	icon?: string;
	sensorId?: number;
	sensor?: SensorDto;
	type: CardID;
}

