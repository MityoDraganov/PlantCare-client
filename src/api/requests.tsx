// apiFunctions.ts
import * as api from "./api";

const endPoints = {
  assignPot: (token: string) => `cropPots/assign/${token}`,
  cropPots: "cropPots"
};

export const assignCropPot = (token: string) => {
  return api.post(endPoints.assignPot(token));
};

export const getAllPots = () => {
  return api.get(endPoints.cropPots)
}

