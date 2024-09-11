import { InputGroup } from "../../../../components/InputGroup";
import { TextAreaGroup } from "../../../../components/TextAreaGroup";
import { Button } from "../../../../components/ui/button";
import useFormData from "../../../../hooks/useForm";
import { WebhookDto } from "../../../../dtos/webhooks.dto";
import useLoading from "../../../../hooks/useLoading";
import { createWebhook } from "../../../../api/requests";
import { SensorDto } from "../../../../dtos/sensors.dto";
import usePotStateUpdate from "../../../../hooks/usePotStateUpdate";
import { Checkbox } from "../../../ui/checkbox";
import { useContext } from "react";
import { PotContext } from "../../../../contexts/PotContext";

export const NewEndpoint = ({ returnTab }: { returnTab: () => void }) => {
	const [webHookData, setWebHookData] = useFormData<WebhookDto>({
		endpointUrl: "",
		description: "",
		subscribedEvents: [],
	});

	const { addWebhook } = usePotStateUpdate();

	const { beginLoading, endLoading } = useLoading();

	const { selectedPot } = useContext(PotContext);
	if (!selectedPot) {
		return;
	}

	const handleSubmitWebhook = async () => {
		beginLoading();
		returnTab();
		const result = await createWebhook(selectedPot.id, webHookData);
		addWebhook(selectedPot.id, result);
		endLoading();
	};

	const updateCheckboxesState = (updatedSubscribedEvents: SensorDto[]) => {
		setWebHookData({
			id: "subscribedEvents",
			value: updatedSubscribedEvents,
		});
	};

	const handleCheckboxChange = (sensorSerialNumber: string) => {
		const isChecked = webHookData?.subscribedEvents.some(
			(event) => event.serialNumber === sensorSerialNumber
		);
		let updatedSubscribedEvents: SensorDto[];

		if (isChecked) {
			updatedSubscribedEvents = webHookData.subscribedEvents.filter(
				(event) => event.serialNumber !== sensorSerialNumber
			);
		} else {
			const selectedSensor = selectedPot.sensors?.find(
				(sensor) => sensor.serialNumber === sensorSerialNumber
			);
			if (selectedSensor) {
				updatedSubscribedEvents = [
					...webHookData.subscribedEvents,
					selectedSensor,
				];
			} else {
				return;
			}
		}

		if (updateCheckboxesState) {
			updateCheckboxesState(updatedSubscribedEvents);
		}
	};
	return (
		<div className="flex flex-col gap-6">
			<InputGroup
				id="endpointUrl"
				label="Endpoint URL"
				placeHolder="e.g. https://www.example.com/webhook"
				onChange={setWebHookData}
				value={webHookData.endpointUrl}
			/>

			<TextAreaGroup
				id="description"
				onChange={setWebHookData}
				value={webHookData.description}
				label="Description"
				placeHolder="This webhook is about..."
			/>

			<div>
				<h4>Subscribe to events</h4>
				<ul className="flex flex-col">
					{selectedPot.sensors?.map((x) => (
						<li
							key={x?.serialNumber}
							className="flex items-center gap-1 mt-1 pl-2"
						>
							<Checkbox
								checked={webHookData?.subscribedEvents?.some(
									(s) => s?.serialNumber === x?.serialNumber
								)}
								onClick={() =>
									handleCheckboxChange(x?.serialNumber)
								}
								id={x?.serialNumber}
							/>
							<label
								className="text-sm font-medium hover:cursor-pointer"
								htmlFor={x?.serialNumber}
							>
								{x?.alias}
							</label>
						</li>
					))}
				</ul>
			</div>

			<Button onClick={handleSubmitWebhook}>Add Endpoint</Button>

			<div className="px-7 border py-2 rounded">
				<p className="w-[90%] after:text-muted-foreground">
					When a subscribed to sensor provides a new{" "}
					<span className="text-black font-semibold italic">
						measurement
					</span>
					, this will send a{" "}
					<span className="text-black uppercase font-medium">
						post
					</span>{" "}
					request to the provided url including the new{" "}
					<span className="text-black font-semibold italic">
						measurement
					</span>
					.
				</p>
			</div>
		</div>
	);
};
