import { ControlDto } from "../dtos/controls.dto";
import { CropPotRequestDto } from "../dtos/CropPot.dto";
import { SensorDto } from "../dtos/sensors.dto";
import { WebhookDto } from "../dtos/webhooks.dto";
import * as api from "./api";

const endPoints = {
	assignPot: (token: string) => `cropPots/assign/${token}`,
	cropPots: (id ?: number) => id ? `cropPots/${id}` : "cropPots",
	webhooks: (routeData?: { potId: number; webhookId?: number }) =>
		!routeData
			? "webhooks"
			: !routeData.webhookId
			? `webhooks/${routeData.potId}`
			: `webhooks/${routeData.potId}/${routeData.webhookId}`,

	controls: (controlId?: number) =>
		controlId ? `controls/${controlId}` : "controls",
	sensors: (sensorId?: number) =>
		sensorId ? `sensors/${sensorId}` : "sensors",
};

// --CROP POTS--
export const assignCropPot = (token: string) => {
	return api.post(endPoints.assignPot(token));
};

export const getAllPots = () => {
	return api.get(endPoints.cropPots());
};

export const updatePot = (potId: number, potData: CropPotRequestDto) => {
	return api.put(endPoints.cropPots(potId), potData)
}

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
	return api.put(endPoints.controls(), updateData);
};

//	--SENSORS--
export const updateSensor = (sensorId: number, updateData: SensorDto) => {
	return api.put(endPoints.sensors(sensorId), updateData);
};
