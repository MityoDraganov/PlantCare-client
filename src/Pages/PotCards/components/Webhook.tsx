import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../../../components/ui/dialog";
import { TableCell, TableRow } from "../../../components/ui/table";
import { WebhookDialogCard } from "../../../components/webhookDialogCard";
import { WebhookDto } from "../../../dtos/webhooks.dto";
import useFormData from "../../../hooks/useForm";
import { updateWebhook } from "../../../api/requests";
import { CropPotResponseDto } from "../../../dtos/CropPot.dto";

export const Webhook = ({
	webhook,
	potData,
}: {
	webhook: WebhookDto;
	potData: CropPotResponseDto;
}) => {
	const [updateData, setUpdateData] = useFormData<WebhookDto>(webhook);

	const handleUpdateWebhook = async (
		webhookId: number | undefined,
		updatedField: Partial<WebhookDto>
	) => {
		await updateWebhook(potData.id, webhookId, updatedField);
	};

	console.log(potData.sensors)
	return (
		<Dialog>
			<DialogTrigger className="w-full hover:cursor-pointer" asChild>
				<TableRow key={webhook.id}>
					<TableCell className="flex flex-col break-words whitespace-break-spaces font-medium w-full">
						<p className="text-sm font-light">
							{webhook.endpointUrl}
						</p>
					</TableCell>
				</TableRow>
			</DialogTrigger>
			<DialogContent className="w-4/5 md:w-2/3 p-10 rounded-md shadow">
				<DialogTitle className="text-lg font-semibold pl-2">
					Edit Webhook
				</DialogTitle>
				<WebhookDialogCard
					fieldName="endpointUrl"
					webhook={updateData}
					onChange={setUpdateData}
					onUpdateWebhook={() =>
						handleUpdateWebhook(webhook.id, {
							endpointUrl: updateData.endpointUrl,
						})
					}
				/>

				<WebhookDialogCard
					fieldName="description"
					onChange={setUpdateData}
					webhook={updateData}
					onUpdateWebhook={() =>
						handleUpdateWebhook(webhook.id, {
							description: updateData.description,
						})
					}
				/>

				<WebhookDialogCard
					fieldName="subscribedEvents"
					webhook={updateData}
					onChange={setUpdateData}
					sensors={potData.sensors}
					onUpdateWebhook={() =>
						handleUpdateWebhook(webhook.id, {
							subscribedEvents: updateData.subscribedEvents,
						})
					}
				/>
			</DialogContent>
		</Dialog>
	);
};
