import { CanvasDto } from "./canvas.dto";
import { ControlDto } from "./controls.dto";
import { SensorDto } from "./sensors.dto";
import { WebhookDto } from "./webhooks.dto";

export enum SensorStatus {
	Online = "online",
	Updating = "updating",
	Offline = "offline",
}

export interface CropPotResponseDto {
	id: number;
	alias: string;
	isArchived: boolean;
	isPinned: boolean;
	controls: ControlDto[];
	sensors: SensorDto[];
	webhooks?: WebhookDto[];
	status: SensorStatus;
	measurementInterval: string;
	canvas: CanvasDto;
}

export interface CropPotRequestDto {
	alias?: string;
	isPinned?: boolean;
	measurementInterval?: string;
}
