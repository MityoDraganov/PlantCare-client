import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { TabsContent } from "../../../components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../components/ui/table";
import { useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import { InputGroup } from "../../../components/InputGroup";
import useFormData from "../../../hooks/useForm";
import { potWebhookFields } from "../../../Interfaces/Pot.interface";
import { TextAreaGroup } from "../../../components/TextAreaGroup";
import { Checkbox } from "../../../components/ui/checkbox";

enum tabOptions {
	"endpoints" = 0,
	"newEndpoint" = 1,
}

export const WebhookSettings = () => {
	const [tab, setTab] = useState<tabOptions>(tabOptions.endpoints);
	const [webHooks, setWebHooks] = useState<string[]>([]);

	const [webHooksData, setWebHooksData] = useFormData<potWebhookFields>({
		endpointUrl: "",
		description: "",
		subscribedEvents: [],
	});

	const handleParentCheckboxChange = (parentKey: string) => {
		const isParentSelected = webHooksData.subscribedEvents.includes(parentKey);
		let updatedSubscribedEvents;

		if (isParentSelected) {
			// Remove the parent and its children from subscribedEvents
			updatedSubscribedEvents = webHooksData.subscribedEvents.filter(
				(event) =>
					event !== parentKey &&
					event !== "temperature" &&
					event !== "temperature.measured" &&
					event !== "moisture"
			);
		} else {
			// Add the parent and its children to subscribedEvents
			updatedSubscribedEvents = [
				...webHooksData.subscribedEvents,
				parentKey,
				"temperature",
				"temperature.measured",
				"moisture",
			];
		}

		setWebHooksData("subscribedEvents", updatedSubscribedEvents);
	};

	const handleChildCheckboxChange = (childKey: string) => {
		const isChildSelected = webHooksData.subscribedEvents.includes(childKey);
		let updatedSubscribedEvents;

		if (isChildSelected) {
			// Remove the child from subscribedEvents
			updatedSubscribedEvents = webHooksData.subscribedEvents.filter(
				(event) => event !== childKey
			);
		} else {
			// Add the child to subscribedEvents
			updatedSubscribedEvents = [
				...webHooksData.subscribedEvents,
				childKey,
			];
		}

		// If all children are selected, select the parent
		const allChildrenSelected =
			["temperature", "temperature.measured", "moisture"].every((key) =>
				updatedSubscribedEvents.includes(key)
			);

		if (allChildrenSelected) {
			updatedSubscribedEvents = [...updatedSubscribedEvents, "sensors"];
		} else {
			// If not all children are selected, remove the parent
			updatedSubscribedEvents = updatedSubscribedEvents.filter(
				(event) => event !== "sensors"
			);
		}

		setWebHooksData("subscribedEvents", updatedSubscribedEvents);
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
						{webHooks.length === 0 && (
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
						onChange={setWebHooksData}
						value={webHooksData.endpointUrl}
					/>

					<TextAreaGroup
						id="description"
						onChange={setWebHooksData}
						value={webHooksData.description}
						label="Description"
					/>

					<div>
						<h4>Subscribe to events</h4>
						<div>
							<div className="flex items-center space-x-2">
								<Checkbox
									id="sensors"
									checked={webHooksData.subscribedEvents.includes("sensors")}
									onChange={() => handleParentCheckboxChange("sensors")}
								/>
								<label
									htmlFor="sensors"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Sensors
								</label>
							</div>
							<div className="pl-4">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="temperature"
										checked={webHooksData.subscribedEvents.includes("temperature")}
										onChange={() => handleChildCheckboxChange("temperature")}
									/>
									<label
										htmlFor="temperature"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Temperature
									</label>
								</div>
								<div className="pl-4">
									<div className="flex items-center space-x-2">
										<Checkbox
											id="temperature.measured"
											checked={webHooksData.subscribedEvents.includes("temperature.measured")}
											onChange={() => handleChildCheckboxChange("temperature.measured")}
										/>
										<label
											htmlFor="temperature.measured"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Temperature Measured
										</label>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="moisture"
										checked={webHooksData.subscribedEvents.includes("moisture")}
										onChange={() => handleChildCheckboxChange("moisture")}
									/>
									<label
										htmlFor="moisture"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Moisture
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</TabsContent>
	);
};
