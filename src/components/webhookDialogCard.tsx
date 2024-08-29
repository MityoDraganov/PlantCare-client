import React, { ChangeEvent, useState } from "react";
import { WebhookDto } from "../dtos/webhooks.dto";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { SensorDto } from "../dtos/sensors.dto";

// Define a type that conditionally requires `sensors` based on `fieldName`
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
	onUpdateWebhook: (updatedField: Partial<WebhookDto>) => void;
} & (T extends "subscribedEvents"
	? { sensors: SensorDto[] }
	: { sensors?: undefined });

export const WebhookDialogCard = <T extends keyof WebhookDto>({
	webhook,
	fieldName,
	sensors,
	onUpdateWebhook,
	onChange,
}: WebhookDialogCardProps<T>) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const fieldValue = webhook[fieldName];

	console.log(fieldValue)

	let displayValue: React.ReactNode;
	if (!fieldValue) {
		displayValue = `No ${fieldName}`;
	} else if (
		typeof fieldValue === "string" ||
		typeof fieldValue === "number"
	) {
		displayValue = fieldValue;
	} else if (Array.isArray(fieldValue)) {
		displayValue = (
			<ul>
				{fieldValue.map((item, index) => (
					<li key={index} className="flex gap-2 items-center"><Checkbox checked/>{item.alias}</li>
				))}
			</ul>
		);
	} else {
		displayValue = `No ${fieldName}`;
	}

	const handleCheckboxChange = (sensorSerialNumber: string) => {
		const isChecked = webhook?.subscribedEvents?.some(
			(x) => x.serialNumber === sensorSerialNumber
		);

		let updatedSubscribedEvents: SensorDto[];

		if (isChecked) {
			updatedSubscribedEvents = (fieldValue as SensorDto[]).filter(
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

		onUpdateWebhook({ subscribedEvents: updatedSubscribedEvents });
	};

	const handleSaveChange = () => {
		setIsEditing(false);
	};

	console.log(webhook.subscribedEvents)

	return (
		<Card>
			<CardHeader className="p-2 px-4 bg-slate-200/40">
				<CardTitle className="text-[16px] flex justify-between items-center">
					{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}

					{isEditing ? (
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(false)}
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
						<ul className="flex flex-col gap-2">
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
							value={displayValue?.toString() || ""}
							onChange={onChange}
							id={fieldName}
						/>
					)
				) : (
					<p>{displayValue}</p>
				)}
			</CardContent>
		</Card>
	);
};
