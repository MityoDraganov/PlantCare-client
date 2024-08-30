import { useContext } from "react";
import { PotContext } from "../contexts/potContext";
import { WebhookDto } from "../dtos/webhooks.dto";

function usePotStateUpdate() {
	const { cropPots, setCropPots } = useContext(PotContext);

	const addWebhook = (potId: number, webhook: WebhookDto) => {
		cropPots
			?.find((cropPot) => cropPot.id === potId)
			?.webhooks?.push(webhook);
		setCropPots(cropPots);
	};

	const removeWebhook = (webhookId: number) => {
		setCropPots((prevCropPots) => {
			if (!prevCropPots) return prevCropPots;

			const updatedCropPots = prevCropPots.map((cropPot) => {
				if (cropPot.webhooks) {
					const updatedWebhooks = cropPot.webhooks.filter(
						(w) => w.id !== webhookId
					);
					return { ...cropPot, webhooks: updatedWebhooks };
				}
				return cropPot;
			});

			return updatedCropPots;
		});
	};

	return {
		addWebhook,
		removeWebhook,
	};
}

export default usePotStateUpdate;
