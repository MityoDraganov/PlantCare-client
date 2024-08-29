import { Checkbox } from "@radix-ui/react-checkbox";
import { InputGroup } from "../../../../components/InputGroup";
import { TextAreaGroup } from "../../../../components/TextAreaGroup";
import { Button } from "../../../../components/ui/button";
import useFormData from "../../../../hooks/useForm";
import { WebhookDto } from "../../../../dtos/webhooks.dto";
import useLoading from "../../../../hooks/useLoading";
import { addWebhook } from "../../../../api/requests";
import { CropPotResponseDto } from "../../../../dtos/CropPot.dto";
import { SensorWebhookDto } from "../../../../dtos/sensors.dto";

export const NewEndpoint = ({ potData }: { potData: CropPotResponseDto }) => {
	const [webHookData, setWebHookData] = useFormData<WebhookDto>({
		endpointUrl: "",
		description: "",
		subscribedEvents: [],
	});

	const { beginLoading, endLoading } = useLoading();

	const handleSubmitWebhook = async () => {
		beginLoading();
		await addWebhook(potData.id, webHookData);
		endLoading();
	};

	const handleCheckboxChange = (childKey: string) => {
		console.log(webHookData.subscribedEvents);

		const isChildSelected = webHookData.subscribedEvents.some(
			(x) => x.serialNumber === childKey
		);
		let updatedSubscribedEvents: SensorWebhookDto[];

		if (isChildSelected) {
			// Remove the child from subscribedEvents
			updatedSubscribedEvents = webHookData.subscribedEvents.filter(
				(event) => event.serialNumber !== childKey
			);
		} else {
			// Add the child to subscribedEvents
			updatedSubscribedEvents = [
				...webHookData.subscribedEvents,
				{ serialNumber: childKey },
			];
		}

		setWebHookData({
			id: "subscribedEvents",
			value: updatedSubscribedEvents,
		});
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
					{potData.sensors?.map((x) => (
						<li className="pl-2 flex items-center gap-2 pt-2">
							<Checkbox
								id={x.serialNumber}
								checked={webHookData.subscribedEvents.some(
									(w) => w.serialNumber === x.serialNumber
								)}
								onClick={() =>
									handleCheckboxChange(x.serialNumber)
								}
							/>
							<label
								htmlFor={x.serialNumber}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
							>
								{x.alias}
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
