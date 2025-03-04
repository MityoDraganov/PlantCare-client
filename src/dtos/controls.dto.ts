
export interface ControlDto {
	serialNumber: string;
	alias: string;
	description: string;
	isofficial: boolean;
	isAttached: boolean;
	driverUrl: string;
	minValue: number;
	maxValue: number;
	dependantSensor: number | null;
}

export interface ControlRequestDto {
	alias: string;
	description: string;
	isofficial: boolean;
	isAttached: boolean;
	driverUrl: string;
	minValue: number;
	maxValue: number;
	dependantSensorSerial: string | null;
}

export interface Update {}

// export interface ActivePeriodDto {
// 	controlId: number;
// 	id: number;
// 	start: string;
// 	end: string;
// 	days: Days[];
// }

export enum Days {
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
	Sunday = 7,
}
