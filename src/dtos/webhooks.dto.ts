import { MeasuremntDto } from "./measurements.dto";
import { SensorDataResponseDto } from "./sensors.dto";

export interface WebhookResponse {
	sensor: SensorDataResponseDto;

	measurement: MeasuremntDto;
	IsOfficial: boolean;
}
