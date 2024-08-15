export interface SensorDataResponseDto {
	createdAt: Date;
	temperature: number;
	moisture: number;
	waterLevel: number;
	sunExposure: number;
}
export interface CustomSensorDataResponse {
	FieldAlias: string;
	DataValue: number;
}
