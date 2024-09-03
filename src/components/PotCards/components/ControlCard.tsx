import { useState } from "react";
import { HTMLInputTypeAttribute } from "react";
import { ControlDto, Days } from "../../../dtos/controls.dto";
import { InputGroup, orientationOpts } from "../../InputGroup";
import { Pencil } from "lucide-react";
import { ControlDtoWithEditing } from "../PotCard/tabs/InfoTab";
import { DaySelector } from "../../DaySelector";

export const ControlCard = ({
	control,
	isEditing,
	editStateHandler,
	updateControlValue,
}: {
	control: ControlDto;
	isEditing: boolean;
	editStateHandler: (serialNumber: string) => void;
	updateControlValue: <K extends keyof ControlDtoWithEditing>(
		serialNumber: string,
		path: string[],
		value: ControlDtoWithEditing[K]
	) => void;
}) => {
	const [tempValue, setTempValue] = useState<{ [key: string]: string }>({});

	// Extracts only the time component (HH:mm:ss) from a Date object
	const extractTime = (time: string) => {
		const [hours, minutes] = time.split(":");
		if (!hours || !minutes) {
			return ""; // Return an empty string if the time is invalid
		}
		return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
	};

	// Formats time value as an ISO string for the backend
	const formatTimeForBackend = (value: string) => {
		const [hours, minutes, seconds] = value.split(":").map(Number);
		const date = new Date();
		date.setUTCHours(hours, minutes, seconds, 0);
		return date.toISOString(); // Converts to ISO string format
	};

	const handleChange = (
		key: string,
		value: string,
		inputType: HTMLInputTypeAttribute,
		path: string[]
	) => {
		// Save intermediate values to state for time fields
		setTempValue((prev) => ({ ...prev, [key]: value }));

		if (isEditing) {
			const formattedValue =
				inputType === "time" ? formatTimeForBackend(value) : value;
			updateControlValue(control.serialNumber, path, formattedValue);
		}
	};

	const renderControlProperty = (
		key: keyof ControlDto,
		value: any,
		inputType: HTMLInputTypeAttribute = typeof value,
		path: string[]
	) => {
		if (Array.isArray(value)) {
			return (
				<div
					key={key as string}
					className="flex items-center justify-between gap-2"
				>
					<h5>
						{key.charAt(0).toUpperCase() +
							key
								.slice(1)
								.split(/(?=[A-Z])/)
								.join(" ")
								.toLowerCase()}
						:
					</h5>
					<DaySelector
						selectedDays={value as Days[]}
						onChange={(newDays: Days[]) =>
							updateControlValue(
								control.serialNumber,
								path,
								newDays
							)
						}
						isEditing={isEditing}
					/>
				</div>
			);
		} else if (value && typeof value === "object") {
			return (
				<div key={key as string} className="flex flex-col gap-2 pl-2">
					<h5>
						{key.charAt(0).toUpperCase() +
							key
								.slice(1)
								.split(/(?=[A-Z])/)
								.join(" ")
								.toLowerCase()}
						:
					</h5>
					<div className="ml-2 flex flex-col gap-1">
						{Object.entries(value)
							.filter(
								([key]) =>
									!["id", "valid"].includes(key.toLowerCase())
							)
							.map(([subKey, subValue]) => {
								let formattedValue = subValue;

								if (Array.isArray(subValue)) {
									return renderControlProperty(
										subKey as keyof ControlDto,
										formattedValue,
										"date",
										[...path, subKey]
									);
								}

								if (typeof subValue === "string") {
									formattedValue = extractTime(subValue);
								} else if (subValue instanceof Date) {
									formattedValue = extractTime(
										subValue
											.toISOString()
											.split("T")[1]
											.substring(0, 5)
									);
								}

								return renderControlProperty(
									subKey as keyof ControlDto,
									formattedValue,
									"time",
									[...path, subKey]
								);
							})}
					</div>
				</div>
			);
		} else {
			const displayValue =
				inputType === "time"
					? tempValue[key as string] || extractTime(value)
					: value;

			return (
				<InputGroup
					key={key as string}
					label={
						key.charAt(0).toUpperCase() +
						key
							.slice(1)
							.split(/(?=[A-Z])/)
							.join(" ")
							.toLowerCase()
					}
					onChange={(e) =>
						handleChange(
							key as string,
							e.target.value,
							typeof e.target.value,
							path
						)
					}
					orientation={orientationOpts.horizontal}
					type={inputType}
					value={displayValue}
					id={`${key}-${value}`}
					isEditing={isEditing}
				/>
			);
		}
	};

	return (
		<li
			className="flex flex-col gap-2 border-b pb-2"
			key={control.serialNumber}
		>
			<h4 className="flex w-full justify-between pr-2 pb-2 items-center">
				<p>
					{control.alias.charAt(0).toUpperCase() +
						control.alias
							.slice(1)
							.split(/(?=[A-Z])/)
							.join(" ")
							.toLowerCase()}
					:
				</p>
				{!isEditing && (
					<Pencil
						className="hover:cursor-pointer"
						onClick={() => editStateHandler(control.serialNumber)}
					/>
				)}
			</h4>

			<div className="flex flex-col gap-2 text-muted-foreground">
				{Object.entries(control)
					.filter(
						([key]) =>
							![
								"isOfficial",
								"updates",
								"serialNumber",
								"isEditing",
								"id",
							].includes(key)
					)
					.map(([key, value]) => {
						return renderControlProperty(
							key as keyof ControlDto,
							value,
							typeof value,
							[key]
						);
					})}
			</div>
		</li>
	);
};
