import { MeasuremntDto } from "./measurements.dto";

export interface SensorDataResponseDto {
	id: number;
	serialNumber: string;
	alias: string;
	description?: string;
	measurements: MeasuremntDto[];
	IsOfficial: boolean;
}
export interface CustomSensorDataResponse {
	FieldAlias: string;
	DataValue: number;
}
