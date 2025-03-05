import { useContext } from "react";
import { HTMLInputTypeAttribute } from "react";
import { ControlDto } from "../../../dtos/controls.dto";
import { InputGroup, orientationOpts } from "../../InputGroup";
import { ControlDtoWithEditing } from "../PotCard/tabs/InfoTab";
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
	//editStateHandler,
	updateControlValue,
}: {
	control: ControlDto;
	//editStateHandler: (serialNumber: string) => void;
	updateControlValue: <K extends keyof ControlDtoWithEditing>(
		serialNumber: string,
		path: string[],
		value: ControlDtoWithEditing[K]
	) => void;
}) => {
	const { selectedPot } = useContext(PotContext);

	if (!selectedPot) {
		return null;
	}

	const handleChange = (value: string, path: string[]) => {
		updateControlValue(control.serialNumber, path, value);
	};

	const renderControlProperty = (
		key: keyof ControlDto,
		value: any,
		inputType: HTMLInputTypeAttribute = typeof value,
		path: string[]
	) => {
		if (key === "dependantSensor") {
			return (
				<div
					key={key as string}
					className="flex items-center justify-between gap-2"
				>
					<h5>
						{typeof key === "string" &&
							typeof key === "string" &&
							key.charAt(0).toUpperCase() +
								key
									.slice(1)
									.split(/(?=[A-Z])/)
									.join(" ")
									.toLowerCase()}
						:
					</h5>
					<Select
						onValueChange={(value) => {
							updateControlValue(
								control.serialNumber,
								["dependantSensor"],
								value
							);
						}}
						defaultValue={
							control.dependantSensor
								? control.dependantSensor.toString()
								: "none"
						}
					>
						<SelectTrigger>
							<SelectValue
								placeholder={
									control.dependantSensor
										? selectedPot?.sensors.find(
												(s) =>
													s.id ===
													control.dependantSensor
										  )?.alias || "Unknown Sensor"
										: "Select a sensor"
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{selectedPot.sensors.map((sensor) => {
								return (
									<SelectItem
										key={sensor.id}
										value={sensor.serialNumber}
									>
										{sensor.alias
											? sensor.alias
											: sensor.serialNumber}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>
			);
		}
		if (value && typeof value === "object") {
			return (
				<div key={key as string} className="flex flex-col gap-2 pl-2">
					<h5>
						{typeof key === "string" &&
							key.charAt(0).toUpperCase() +
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
			return (
				<InputGroup
					key={key as string}
					label={
						typeof key === "string"
							? key.charAt(0).toUpperCase() +
							  key
									.slice(1)
									.split(/(?=[A-Z])/)
									.join(" ")
									.toLowerCase()
							: String(key)
					}
					onChange={(e) =>
						handleChange(
							e.target.value,
							path
						)
					}
					orientation={orientationOpts.horizontal}
					type={inputType}
					value={value}
					id={`${String(key)}-${String(value)}`}
					isEditing={true}
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
					{control.alias
						? control.alias.charAt(0).toUpperCase() +
						  control.alias
								.slice(1)
								.split(/(?=[A-Z])/)
								.join(" ")
								.toLowerCase()
						: control.serialNumber}
					:
				</p>
				{/* {!isEditing && (
					<Pencil
						className="hover:cursor-pointer"
						onClick={() => editStateHandler(control.serialNumber)}
					/>
				)} */}
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
