import { HTMLInputTypeAttribute } from "react";
import { ControlDto } from "../../../dtos/controls.dto";
import { InputGroup, orientationOpts } from "../../InputGroup";
import { Pencil } from "lucide-react";
import { ControlDtoWithEditing } from "../PotCard/tabs/InfoTab";

export const ControlCard = ({
	control,
	isEditting,
	editStateHandler,
	updateControlValue,
}: {
	control: ControlDto;
	isEditting: boolean;
	editStateHandler: (serialNumber: string) => void;
	updateControlValue: <K extends keyof ControlDtoWithEditing>(
		serialNumber: string,
		key: K,
		value: ControlDtoWithEditing[K]
	) => void;
}) => {
	const renderControlProperty = (
		key: keyof ControlDto,
		value: any,
		inputType: HTMLInputTypeAttribute = typeof value
	) => {
		if (value && typeof value === "object") {
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
						{Object.entries(value).map(([subKey, subValue]) => {
							let formattedValue = subValue;
							if (typeof subValue === "string") {
								// Try to parse the string as a Date
								const parsedDate = new Date(subValue);
								if (!isNaN(parsedDate.getTime())) {
									// If the string is a valid date
									const hours = parsedDate.getUTCHours();
									const minutes = parsedDate.getUTCMinutes();
									const hoursString = hours
										.toString()
										.padStart(2, "0");
									const minutesString = minutes
										.toString()
										.padStart(2, "0");
									formattedValue = `${hoursString}:${minutesString}`;
								}
							} else if (subValue instanceof Date) {
								// Format Date object directly
								const hours = subValue.getUTCHours();
								const minutes = subValue.getUTCMinutes();
								const hoursString = hours
									.toString()
									.padStart(2, "0");
								const minutesString = minutes
									.toString()
									.padStart(2, "0");
								formattedValue = `${hoursString}:${minutesString}`;
							}

							return renderControlProperty(
								subKey as keyof ControlDto,
								formattedValue,
								typeof formattedValue === "string"
									? "text"
									: "number"
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
						key.charAt(0).toUpperCase() +
						key
							.slice(1)
							.split(/(?=[A-Z])/)
							.join(" ")
							.toLowerCase()
					}
					onChange={(e) =>
						updateControlValue(
							control.serialNumber,
							key,
							e.target.value
						)
					}
					orientation={orientationOpts.horizontal}
					type={inputType}
					value={inputType === "number" ? Number(value) : value}
					id={`${key}-${value}`}
					isEditing={isEditting}
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
				{!isEditting && (
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
								"id"
							].includes(key)
					)
					.map(([key, value]) =>
						renderControlProperty(key as keyof ControlDto, value)
					)}
			</div>
		</li>
	);
};
