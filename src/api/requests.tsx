import { ControlDto } from "../dtos/controls.dto";
import { CropPotRequestDto } from "../dtos/CropPot.dto";
import { UploadDriverDto } from "../dtos/driver.dto";
import { SensorDto } from "../dtos/sensors.dto";
import { WebhookDto } from "../dtos/webhooks.dto";
import * as api from "./api";

const endPoints = {
	assignPot: (token: string) => `cropPots/assign/${token}`,
	cropPots: (id?: number) => (id ? `cropPots/${id}` : "cropPots"),
	inbox: "inbox",
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

	drivers: (driverId?: number) =>
		driverId ? `drivers/${driverId}` : "drivers",

	canvas: () => ""
};

// --INBOX
export const getAllMessages = () => {
	return api.get(endPoints.inbox);
};

// --CROP POTS--
export const assignCropPot = (token: string) => {
	return api.post(endPoints.assignPot(token));
};

export const getAllPots = () => {
	return api.get(endPoints.cropPots());
};

export const updatePot = (potId: number, potData: CropPotRequestDto) => {
	return api.put(endPoints.cropPots(potId), potData);
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
	return api.put(endPoints.controls(), updateData);
};

//	--SENSORS--
export const updateSensor = (
	updateData: SensorDto | SensorDto[],
	sensorId?: number
) => {
	return api.put(
		sensorId ? endPoints.sensors(sensorId) : endPoints.sensors(),
		updateData
	);
};

// --DRIVERS--
export const getAllDrivers = () => {
	return api.get(endPoints.drivers());
};

export const uploadDriver = (driverData: UploadDriverDto) => {
	return api.post(endPoints.drivers(), driverData, "formData");
};

export const updateDriver = (driverData: UploadDriverDto, driverId: number) => {
	return api.put(endPoints.drivers(driverId), driverData, "formData");
};

export const deleteDriver = (driverId: number) => {
	return api.del(endPoints.drivers(driverId));
};


//	--PINNED CARDS
export const createPinnedCard = () => {
	
}

export const updatePinnedCard = () => {

}