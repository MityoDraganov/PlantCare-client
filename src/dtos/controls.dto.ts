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
	start: Date;
	end: Date;
}