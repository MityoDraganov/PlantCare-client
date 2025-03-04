import { PotAttachmentsRequest } from "../components/PotCards/PotCard/tabs/InfoTab";
import { CanvasDto } from "../dtos/canvas.dto";
import { ControlDto } from "../dtos/controls.dto";
import { CropPotRequestDto } from "../dtos/CropPot.dto";

import { UploadDriverDto } from "../dtos/driver.dto";
import { PotAttachmentsDto, SensorDto } from "../dtos/sensors.dto";
import { WebhookDto } from "../dtos/webhooks.dto";
import * as api from "./api";

const endPoints = {
	assignPot: (token: string) => `cropPots/assign/${token}`,
	cropPots: (id?: number) => (id ? `cropPots/${id}` : "cropPots"),
	measurePot: (id: number) => `cropPots/measure/${id}`,
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
	sensorsWithPotId: (sensorId?: number) =>
		sensorId ? `sensors/${sensorId}` : "sensors",
	drivers: (driverId?: number) =>
		driverId ? `drivers/${driverId}` : "drivers",

	canvas: (canvasId?: number) => (canvasId ? `canvas/${canvasId}` : "canvas"),
	diagnoseMeasurement: (measurementGroupId: number) =>
		`measurements/diagnoseMeasurement/${measurementGroupId}`,
};

// --INBOX
export const getAllMessages = () => {
	return api.get(endPoints.inbox);
};

export const markAllMessagesAsRead = () => {
	return api.put(endPoints.inbox);
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

export const measurePot = (potId: number) => {
	return api.get(endPoints.measurePot(potId));
};

export const sendPicture = (measurementGroupId: number, picture: File) => {
	return api.post(
		endPoints.diagnoseMeasurement(measurementGroupId),
		{ picture },
		"formData"
	);
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
export const updateSensor = (updateData: PotAttachmentsRequest) => {
	return api.put(endPoints.sensors(), updateData);
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

// --CANVASES

export const getAllCanvases = () => {
	return api.get(endPoints.canvas());
};
export const createCanvas = (canvasData: CanvasDto) => {
	return api.post(endPoints.canvas(), canvasData);
};

export const updateCanvas = (canvasData: CanvasDto, canvasId: number) => {
	return api.put(endPoints.canvas(canvasId), canvasData);
};
