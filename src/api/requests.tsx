// apiFunctions.ts
import apiService from "./api";

const endPoints = {
  cropPots: (token: string) => `cropPots/assign/${token}`,
};

export const assignCropPot = (token: string) => {
  return apiService.post(endPoints.cropPots(token));
};

