// apiFunctions.ts
import * as api from "./api";

const endPoints = {
  cropPots: (token: string) => `cropPots/assign/${token}`,
};

export const assignCropPot = (token: string) => {
  return api.post(endPoints.cropPots(token));
};

