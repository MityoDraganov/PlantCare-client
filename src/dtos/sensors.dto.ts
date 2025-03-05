import { ControlDto } from "./controls.dto";
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

export interface SensorRequestDto {
	id: number;
	alias?: string;
	description?: string;
	IsOfficial: boolean;
	IsAttached:   boolean;
	driverUrl: string;
}


export interface PotAttachmentsDto {
	sensorDtos: SensorRequestDto[];
	controlDtos: ControlDto[];
}