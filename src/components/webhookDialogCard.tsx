import { ChangeEvent, useState } from "react";
import { WebhookDto } from "../dtos/webhooks.dto";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { SensorDto } from "../dtos/sensors.dto";

type WebhookDialogCardProps<T extends keyof WebhookDto> = {
	webhook: WebhookDto;
	onChange: (
		e:
			| ChangeEvent<
					HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			  >
			| { id: string; value: any }
			| FileList
	) => void;
	fieldName: T;
	UpdateWebhook: (updatedField: Partial<WebhookDto>) => void;
	CancelFieldUpdate: () => void;
} & (T extends "subscribedEvents"
	? {
			sensors: SensorDto[];
			updateCheckboxesState: (
				updatedSubscribedEvents: SensorDto[]
			) => void;
	  }
	: { sensors?: undefined; updateCheckboxesState?: undefined });

export const WebhookDialogCard = <T extends keyof WebhookDto>({
	webhook,
	fieldName,
	sensors,
	UpdateWebhook,
	onChange,
	updateCheckboxesState,
	CancelFieldUpdate,
}: WebhookDialogCardProps<T>) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const fieldValue = webhook[fieldName];

	const handleCheckboxChange = (sensorSerialNumber: string) => {
		console.log(webhook)

		console.log(sensors)
		
		const isChecked = webhook?.subscribedEvents.some(
			(event) => event.serialNumber === sensorSerialNumber
		);
		let updatedSubscribedEvents: SensorDto[];

		if (isChecked) {
			updatedSubscribedEvents = webhook.subscribedEvents.filter(
				(event) => event.serialNumber !== sensorSerialNumber
			);
		} else {
			const selectedSensor = sensors?.find(
				(sensor) => sensor.serialNumber === sensorSerialNumber
			);
			if (selectedSensor) {
				updatedSubscribedEvents = [
					...webhook.subscribedEvents,
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
	const handleSaveChange = () => {
		setIsEditing(false);
		UpdateWebhook({ [fieldName]: webhook[fieldName] });
	};

	return (
		<Card>
			<CardHeader className="p-2 px-4 bg-slate-200/40">
				<CardTitle className="text-[16px] flex justify-between items-center">
					{fieldName.charAt(0).toUpperCase() +
						fieldName
							.slice(1)
							.split(/(?=[A-Z])/)
							.join(" ")
							.toLowerCase()}

					{isEditing ? (
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									CancelFieldUpdate();
									setIsEditing(false);
								}}
							>
								Cancel
							</Button>
							<Button
								variant="blue"
								size="sm"
								onClick={handleSaveChange}
							>
								Save
							</Button>
						</div>
					) : (
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsEditing(true)}
						>
							Edit
						</Button>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className={`p-4 ${isEditing ? "p-2" : ""}`}>
				{isEditing ? (
					fieldName === "subscribedEvents" ? (
						<ul className="flex flex-col gap-2 p-2">
							{sensors?.map((sensor) => (
								<li
									key={sensor?.serialNumber}
									className="flex items-center gap-2"
								>
									<Checkbox
										checked={webhook?.subscribedEvents?.some(
											(x) =>
												x?.serialNumber ===
												sensor?.serialNumber
										)}
										onClick={() =>
											handleCheckboxChange(
												sensor?.serialNumber
											)
										}
										id={sensor?.serialNumber}
									/>
									<label
										className="text-sm font-medium"
										htmlFor={sensor?.serialNumber}
									>
										{sensor?.alias}
									</label>
								</li>
							))}
						</ul>
					) : (
						<Input
							value={fieldValue?.toString() || ""}
							onChange={onChange}
							id={fieldName}
						/>
					)
				) : (
					<p>
						{!fieldValue ? (
							`No "${
								fieldName.charAt(0).toUpperCase() +
								fieldName
									.slice(1)
									.split(/(?=[A-Z])/)
									.join(" ")
									.toLowerCase()
							}"`
						) : Array.isArray(fieldValue) ? (
							fieldValue.length === 0 ? (
								`No ${
									fieldName.charAt(0).toUpperCase() +
									fieldName
										.slice(1)
										.split(/(?=[A-Z])/)
										.join(" ")
										.toLowerCase()
								}`
							) : (
								<ul>
									{fieldValue.map((item, index) => (
										<li
											key={index}
											className="flex gap-2 items-center"
										>
											<Checkbox checked disabled />
											{item.alias}
										</li>
									))}
								</ul>
							)
						) : (
							fieldValue
						)}
					</p>
				)}
			</CardContent>
		</Card>
	);
};
