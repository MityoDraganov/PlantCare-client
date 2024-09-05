import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../../../components/ui/dialog";
import { TableCell, TableRow } from "../../../components/ui/table";
import { WebhookDialogCard } from "../../../components/dialogs/webhookDialogCard";
import { WebhookDto } from "../../../dtos/webhooks.dto";
import useFormData from "../../../hooks/useForm";
import { deleteWebhook, updateWebhook } from "../../../api/requests";
import { SensorDto } from "../../../dtos/sensors.dto";
import { Button } from "../../../components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import useLoading from "../../../hooks/useLoading";
import usePotStateUpdate from "../../../hooks/usePotStateUpdate";
import { useContext, useState } from "react";
import { PotContext } from "../../../contexts/potContext";

export const Webhook = ({
	webhook,
}: {
	webhook: WebhookDto;
}) => {
	const [updateData, setUpdateData] = useFormData<WebhookDto>(webhook);
	const { beginLoading, endLoading } = useLoading();
	const { removeWebhook } = usePotStateUpdate();

	const {selectedPot} = useContext(PotContext)
	if(!selectedPot){
		return;
	}

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

	const handleUpdateWebhook = async (
		webhookId: number | undefined,
		updatedField: Partial<WebhookDto>
	) => {
		await updateWebhook(selectedPot.id, webhookId, updatedField);
	};

	const updateCheckboxesState = (updatedSubscribedEvents: SensorDto[]) => {
		setUpdateData({
			id: "subscribedEvents",
			value: updatedSubscribedEvents,
		});
	};

	const cancelFieldUpdate = <K extends keyof WebhookDto>(key: K) => {
		setUpdateData({ id: key, value: webhook[key] });
	};



	const handleRemoveWebhook = async () => {
		setIsDialogOpen(false)
		beginLoading();
		if (webhook.id) {
			await deleteWebhook(selectedPot.id, webhook.id);
			removeWebhook(webhook.id);
		}
		endLoading();
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
					UpdateWebhook={() =>
						handleUpdateWebhook(webhook.id, {
							endpointUrl: updateData.endpointUrl,
						})
					}
					CancelFieldUpdate={() => cancelFieldUpdate("endpointUrl")}
				/>

				<WebhookDialogCard
					fieldName="description"
					onChange={setUpdateData}
					webhook={updateData}
					UpdateWebhook={() =>
						handleUpdateWebhook(webhook.id, {
							description: updateData.description,
						})
					}
					CancelFieldUpdate={() => cancelFieldUpdate("description")}
				/>

				<WebhookDialogCard
					fieldName="subscribedEvents"
					webhook={updateData}
					onChange={setUpdateData}
					sensors={selectedPot.sensors}
					UpdateWebhook={() =>
						handleUpdateWebhook(webhook.id, {
							subscribedEvents: updateData.subscribedEvents,
						})
					}
					updateCheckboxesState={updateCheckboxesState}
					CancelFieldUpdate={() =>
						cancelFieldUpdate("subscribedEvents")
					}
				/>

				<div className="flex gap-4">
					<Button variant="secondary">Dissable</Button>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">Delete</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Are you absolutely sure?
									</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will{" "}
										<span className="font-bold">
											permanently delete
										</span>{" "}
										your{" "}
										<span className="font-bold">
											webhook
										</span>{" "}
										from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										className="bg-red-500"
										onClick={handleRemoveWebhook}
									>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</DialogContent>
		</Dialog>
	);
};
