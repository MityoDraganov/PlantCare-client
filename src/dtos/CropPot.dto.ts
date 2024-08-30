import { SensorDto } from "./sensors.dto";
import { WebhookDto } from "./webhooks.dto";

export interface ControlSettingsDto {
	id: number;
	wateringInterval: number;
}

// CropPotResponse represents the response DTO for a CropPot
export interface CropPotResponseDto {
	id: number;
	alias: string;
	lastWateredAt: Date;
	isArchived: boolean;
	controlSettings: ControlSettingsDto;
	sensors: SensorDto[]
	webhooks?: WebhookDto[]
}
