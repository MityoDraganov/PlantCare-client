import { MeasuremntDto } from "./measurements.dto";

export interface SensorDto {
	id: number;
	serialNumber: string;
	alias: string;
	description?: string;
	measurements: MeasuremntDto[];
	IsOfficial: boolean;
}

// export interface SensorWebhookDto {
// 	serialNumber: string;
// 	alias?: string;
// 	description?: string;
// 	IsOfficial: boolean;
// }
