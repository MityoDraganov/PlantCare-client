import { SensorDto } from "./sensors.dto";

export interface WebhookDto {
	id?: number;
	endpointUrl: string;
	description?: string;
	subscribedEvents: SensorDto[]
}