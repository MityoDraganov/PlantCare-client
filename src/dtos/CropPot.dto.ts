import {
	SensorDataResponseDto,
} from "./sensors.dto";
import { WebhookDto } from "./webhooks.dto";

interface ControlSettingsResponseDTO {
	WateringInterval: number;
}

// CropPotResponse represents the response DTO for a CropPot
export interface CropPotResponseDto {
	id: number;
	alias: string;
	lastWateredAt: Date;
	isArchived: boolean;
	controlSettings: ControlSettingsResponseDTO;
	sensors: SensorDataResponseDto[]
	webhooks?: WebhookDto[]
}
