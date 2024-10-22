import { MeasuremntDto } from "./measurements.dto";

export interface SensorDto {
	id: number;
	serialNumber: string;
	alias?: string;
	description?: string;
	measurements: MeasuremntDto[];
	IsOfficial: boolean;
	IsAttached:   boolean;
	driverUrl: string;
}
