import { useContext, useState } from "react";
import { HTMLInputTypeAttribute } from "react";
import { ActivePeriodDto, ControlDto, Days } from "../../../dtos/controls.dto";
import { InputGroup, orientationOpts } from "../../InputGroup";
import { Pencil } from "lucide-react";
import { ControlDtoWithEditing } from "../PotCard/tabs/InfoTab";
import { DaySelector } from "../../selectors/DaySelector";
import { ConditionDto } from "../../../dtos/condition.dto";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { PotContext } from "../../../contexts/PotContext";

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
	const { selectedPot } = useContext(PotContext);

	const extractTime = (time: any) => {
		if (typeof time !== "string") {
			return "";
		}

		const parts = time.split(":");
		if (parts.length !== 2) {
			return "";
		}

		const [hours, minutes] = parts;
		return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
	};

	const formatTimeForBackend = (value: string) => {
		const [hours, minutes, seconds] = value.split(":").map(Number);
		const date = new Date();
		date.setUTCHours(hours, minutes, seconds, 0);
		return date.toISOString();
	};

	const handleChange = (
		key: string,
		value: string,
		inputType: HTMLInputTypeAttribute,
		path: string[]
	) => {
		setTempValue((prev) => ({ ...prev, [key]: value }));

		if (isEditing) {
			const formattedValue =
				inputType === "time" ? formatTimeForBackend(value) : value;
			updateControlValue(control.serialNumber, path, formattedValue);
		}
	};

	const renderControlProperty = (
		key: keyof ControlDto | keyof ActivePeriodDto | keyof ConditionDto,
		value: any,
		inputType: HTMLInputTypeAttribute = typeof value,
		path: string[]
	) => {
		if (key === "dependentSensor") {
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
					<Select
						disabled={!isEditing}
						onValueChange={(value) => {
							const selectedSensor = selectedPot?.sensors.find(
								(sensor) => sensor.id === Number(value)
							);
							if (selectedSensor) {
								updateControlValue(
									control.serialNumber,
									["condition"],
									{
										...control.condition,
										dependentSensor: selectedSensor,
									}
								);
							}
						}}
						defaultValue={value ? value.id.toString() : ""}
					>
						<SelectTrigger>
							{control.condition.dependentSensor ? (
								<SelectValue
									placeholder={
										control.condition.dependentSensor.alias
									}
								/>
							) : (
								<SelectValue placeholder="Select a sensor" />
							)}
						</SelectTrigger>
						<SelectContent>
							<SelectItem
								key={"unselect"}
								value=""
							>
								Remove selection
							</SelectItem>
							{selectedPot?.sensors.map((sensor) => (
								<SelectItem
									key={sensor.id}
									value={sensor.id.toString()}
								>
									{sensor.alias}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			);
		}
		if (Array.isArray(value)) {
			if (key === "days")
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
							selectedDays={value as Days[]} // Type assertion if necessary
							onChange={(newDays: Days[]) => console.log(newDays)}
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
								([key]) => !["id"].includes(key.toLowerCase())
							)
							.map(([subKey, subValue]) => {
								let formattedValue = subValue;

								if (
									typeof subValue === "string" &&
									subValue.includes(":")
								) {
									formattedValue = extractTime(subValue);
									return renderControlProperty(
										subKey as keyof ControlDto,
										formattedValue,
										"time",
										[...path, subKey]
									);
								}

								return renderControlProperty(
									subKey as keyof ControlDto,
									formattedValue,
									"number",
									[...path, subKey]
								);
							})}
					</div>
				</div>
			);
		} else {
			const displayValue =
				inputType === "time"
					? tempValue[key as string] ||
					  (typeof value === "string" && value.includes(":")
							? extractTime(value)
							: value)
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
