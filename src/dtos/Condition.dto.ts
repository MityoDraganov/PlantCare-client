import { SensorDto } from "./sensors.dto";

export interface ConditionDto {
    dependentSensor?: SensorDto;
    Off: number;
    On: number;
}