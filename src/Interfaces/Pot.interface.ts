export interface potData {
    token: string;
	alias: string;
}

export interface potWebhookFields {
    endpointUrl: string;
    description?: string;
    subscribedEvents: string[]
}