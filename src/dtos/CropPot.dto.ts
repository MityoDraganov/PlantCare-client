import { ControlDto } from "./controls.dto";
import { SensorDto } from "./sensors.dto";
import { WebhookDto } from "./webhooks.dto";


// CropPotResponse represents the response DTO for a CropPot
export interface CropPotResponseDto {
	id: number;
	alias: string;
	isArchived: boolean;
	controls: ControlDto[];
	sensors: SensorDto[]
	webhooks?: WebhookDto[]
}

export interface CropPotRequestDto {
	alias: string;
}
