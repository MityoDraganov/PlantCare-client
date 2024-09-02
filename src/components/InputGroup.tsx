import { HTMLInputTypeAttribute } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export enum orientationOpts {
	horizontal,
	vertical,
}

export const InputGroup = ({
	label,
	placeHolder,
	value,
	onChange,
	id,
	type,
	className,
	absoluteLabel,
	orientation = orientationOpts.vertical,
	isEditing,
}: {
	label: string;
	placeHolder?: string;
	value?: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id: any;
	type?: HTMLInputTypeAttribute;
	className?: string;
	multiple?: boolean;
	absoluteLabel?: boolean;
	orientation?: orientationOpts;
	isEditing?: boolean;
}) => {
	return (
		<div
			className={`flex ${
				orientation === orientationOpts.horizontal
					? "flex-row items-center w-full justify-between gap-2"
					: "flex-col"
			} gap-1 relative ${className}`}
		>
			<Label className={`${absoluteLabel ? "absolute -top-4" : ""}`}>
				{label}:
			</Label>
			<Input
				placeholder={placeHolder}
				value={value}
				onChange={onChange}
        disabled={!isEditing && orientation === orientationOpts.horizontal}
				className={`${
					(orientation === orientationOpts.vertical && !value) ||
					(orientation === orientationOpts.horizontal && !isEditing)
						? "bg-muted"
						: ""
				} ${
					orientation === orientationOpts.horizontal
						? "w-fit px-1 h-8"
						: "w-full"
				}`}
				id={id}
				type={type || "text"}
				multiple
			/>
		</div>
	);
};
