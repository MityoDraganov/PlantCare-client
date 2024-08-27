// apiFunctions.ts
import { potWebhookFields } from "../Interfaces/Pot.interface";
import * as api from "./api";

const endPoints = {
	assignPot: (token: string) => `cropPots/assign/${token}`,
	cropPots: "cropPots",
	webhooks: (potId?: number) => (potId ? `webhooks/${potId}` : "webhooks"),
};

export const assignCropPot = (token: string) => {
	return api.post(endPoints.assignPot(token));
};

export const getAllPots = () => {
	return api.get(endPoints.cropPots);
};

// --WEBHOOKS--
export const addWebhook = (potId: number, webHookData: potWebhookFields) => {
  return api.post(endPoints.webhooks(potId), webHookData)
};
