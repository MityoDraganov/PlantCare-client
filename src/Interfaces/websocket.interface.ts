// Define the Event enum
export enum Event {
	ForecastAlert = "forecastAlert",
	SensorConnected = "SensorConnected",
	UpdatedPot = "updatedPot",
	PotMeasurements = "PotMeasurements",

	NotificationAlert = "notificationAlert",

	AsyncError = "asyncError",
	AsyncPromise = "asyncPromise"
}

export interface Message {
	statusResponse?: number;
	event?: Event;
	data: MessageData; // This will be strongly typed now
	timestamp: string | Date;
	isRead: boolean;
}

interface MessageData {
	title?: string;
	text?: string;
	action?: any;
	[key: string]: any; // For any other dynamic fields
}
