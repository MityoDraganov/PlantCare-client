import * as api from "./api"

const endPoints = {


    assignCropPot: ""
}


export const assignCropPot = () => {
    return api.post(endPoints.assignCropPot)
}


