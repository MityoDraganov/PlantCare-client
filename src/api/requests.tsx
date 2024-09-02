// apiFunctions.ts
import { ControlDto } from "../dtos/controls.dto";
import { WebhookDto } from "../dtos/webhooks.dto";
import * as api from "./api";

const endPoints = {
	assignPot: (token: string) => `cropPots/assign/${token}`,
	cropPots: "cropPots",
	webhooks: (routeData?: { potId: number; webhookId?: number }) =>
		!routeData
			? "webhooks"
			: !routeData.webhookId
			? `webhooks/${routeData.potId}`
			: `webhooks/${routeData.potId}/${routeData.webhookId}`,

	controls: (controlId?: number) => controlId ? `controls/${controlId}` : "controls"
};

export const assignCropPot = (token: string) => {
	return api.post(endPoints.assignPot(token));
};

export const getAllPots = () => {
	return api.get(endPoints.cropPots);
};

// --WEBHOOKS--
export const createWebhook = (potId: number, webHookData: WebhookDto) => {
	return api.post(endPoints.webhooks({ potId }), webHookData);
};

export const updateWebhook = (
	potId: number,
	webhookId: number | undefined,
	updatedField: Partial<WebhookDto>
) => {
	return api.put(endPoints.webhooks({ potId, webhookId }), updatedField);
};

export const deleteWebhook = (potId: number, webhookId: number) => {
	return api.del(endPoints.webhooks({ potId, webhookId }));
};

//	--CONTROLLS--
export const updateControllSetting = (updateData: ControlDto[]) => {
	return api.put(endPoints.controls(), updateData)
}
