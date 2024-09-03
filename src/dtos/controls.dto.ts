export interface ControlDto {
	serialNumber: string;
	alias: string;
	description: string;
	isofficial: boolean;

	updates: Update[];
	onCondition: number;
	offCondition: number;

	activePeriod: ActivePeriod;
}

export interface Update {

}

export interface ActivePeriod {
	controlId: number;
	id: number;
	start: string;
	end: string;
	days: Days[];
}

export enum Days {
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
	Sunday = 7
}