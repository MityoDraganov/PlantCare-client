import {
	CustomSensorDataResponse,
	SensorDataResponseDto,
} from "./SensorData.dto";

interface ControlSettingsResponseDTO {
	WateringInterval: number;
}

// CropPotResponse represents the response DTO for a CropPot
export interface CropPotResponseDto {
	id: number;
	alias: string;
	lastWateredAt: Date;
	IsArchived: boolean;
	controlSettings: ControlSettingsResponseDTO;
	sensorData: SensorDataResponseDto[];
	customSensorData: CustomSensorDataResponse[];
}
