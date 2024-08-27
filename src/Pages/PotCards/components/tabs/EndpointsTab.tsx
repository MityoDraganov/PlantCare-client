import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { TabsContent } from "../../../../components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../components/ui/table";
import { useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { InputGroup } from "../../../../components/InputGroup";
import useFormData from "../../../../hooks/useForm";
import { potWebhookFields } from "../../../../Interfaces/Pot.interface";
import { TextAreaGroup } from "../../../../components/TextAreaGroup";
import { Checkbox } from "../../../../components/ui/checkbox";
import { addWebhook } from "../../../../api/requests";
import { CropPotResponseDto } from "../../../../dtos/CropPot.dto";

enum tabOptions {
	"endpoints" = 0,
	"newEndpoint" = 1,
}

export const EndpointsTab = ({ potData }: { potData: CropPotResponseDto }) => {
	const [tab, setTab] = useState<tabOptions>(tabOptions.endpoints);

	const [webHookData, setWebHookData] = useFormData<potWebhookFields>({
		endpointUrl: "",
		description: "",
		subscribedEventsSerialNums: [],
	});

	const handleChildCheckboxChange = (childKey: string) => {
		console.log(webHookData.subscribedEventsSerialNums);

		const isChildSelected =
			webHookData.subscribedEventsSerialNums.includes(childKey);
		let updatedSubscribedEvents: string[];

		if (isChildSelected) {
			// Remove the child from subscribedEvents
			updatedSubscribedEvents =
				webHookData.subscribedEventsSerialNums.filter(
					(event) => event !== childKey
				);
		} else {
			// Add the child to subscribedEvents
			updatedSubscribedEvents = [
				...webHookData.subscribedEventsSerialNums,
				childKey,
			];
		}

		setWebHookData({
			id: "subscribedEventsSerialNums",
			value: updatedSubscribedEvents,
		});
	};

	const handleSubmitWebhook = async () => {
		await addWebhook(potData.id, webHookData);
	};

	return (
		<TabsContent value="endpoints" className="w-full">
			<div className="flex items-center py-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem
							onClick={() => setTab(tabOptions.endpoints)}
							className={`cursor-pointer hover:text-black ${
								tab === tabOptions.endpoints
									? "text-bold underline"
									: ""
							}`}
						>
							Endpoints
						</BreadcrumbItem>

						{tab === tabOptions.newEndpoint && (
							<>
								<BreadcrumbSeparator>
									<ChevronRight />
								</BreadcrumbSeparator>
								<BreadcrumbItem
									onClick={() => setTab(tabOptions.endpoints)}
									className={`cursor-pointer hover:text-black  ${
										tab === tabOptions.newEndpoint
											? "text-bold underline"
											: ""
									}`}
								>
									New Endpoint
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>
				<Button
					variant="outline"
					className={`ml-auto mr-2 text-green-500 border-green-500 hover:bg-green-200/50 hover:text-green-800 hover:border-green-800 flex gap-3 ${
						tab === tabOptions.newEndpoint ? "hidden" : ""
					}`}
					onClick={() => setTab(tabOptions.newEndpoint)}
				>
					<Plus />
					Add Endpoint
				</Button>
			</div>

			{tab === tabOptions.endpoints && (
				<Table>
					<TableHeader>
						<TableRow className="uppercase font-mono">
							<TableHead className="flex-1">url</TableHead>
							<TableHead className="w-1/5">error rate</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{potData.webhooks?.length === 0 && (
							<TableRow key="empty">
								<TableCell className="font-medium">
									No webhooks yet
								</TableCell>
								<TableCell className="text-center">
									--/--
								</TableCell>
							</TableRow>
						)}
						{/* Add your rows here */}
					</TableBody>
				</Table>
			)}

			{tab === tabOptions.newEndpoint && (
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
										checked={webHookData.subscribedEventsSerialNums.includes(
											x.serialNumber
										)}
										onClick={() =>
											handleChildCheckboxChange(
												x.serialNumber
											)
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
			)}
		</TabsContent>
	);
};
