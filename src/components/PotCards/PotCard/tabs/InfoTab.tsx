import { Settings } from "lucide-react";
import { CropPotResponseDto } from "../../../../dtos/CropPot.dto";
import { Chart } from "../../cards/Chart";
import { Dispatch, SetStateAction, useEffect } from "react";
import { tabOptions } from "../PotCard";
import useFormData from "../../../../hooks/useForm";
import { Button } from "../../../ui/button";
import { ControlDto } from "../../../../dtos/controls.dto";
import { ControlCard } from "../../components/ControlCard";
import { updateControllSetting } from "../../../../api/requests";

export interface ControlDtoWithEditing extends ControlDto {
	isEditing: boolean;
}

export const InfoTab = ({
	pot,
	setTab,
}: {
	pot: CropPotResponseDto;
	setTab: Dispatch<SetStateAction<tabOptions>>;
}) => {
	const initialControls: ControlDtoWithEditing[] = pot.controls.map(
		(control) => ({
			...control,
			isEditing: false, // Initialize with isEditing set to false
		})
	);

	const [updateData, _, setUpdateData] = useFormData(initialControls);

	const editStateHandler = (serialNumber: string) => {
		const newData = updateData.map((control) =>
			control.serialNumber === serialNumber
				? { ...control, isEditing: !control.isEditing }
				: control
		);

		setUpdateData(newData);
	};

	const updateControlValue = <K extends keyof ControlDtoWithEditing>(
		serialNumber: string,
		key: K,
		value: ControlDtoWithEditing[K]
	) => {
		// Convert to number if the key is "onCondition" or "offCondition"
		const newValue =
			key === "onCondition" || key === "offCondition"
				? Number(value)
				: value;
	
		const newData = updateData.map((control) =>
			control.serialNumber === serialNumber
				? { ...control, [key]: newValue }
				: control
		);
	
		setUpdateData(newData);
	};
	

	useEffect(() => {
		console.log(updateData);
	}, [updateData]);

	const saveUpdate = async () => {
		await updateControllSetting(updateData)
	}

	return (
		<div className="grid grid-cols-1 h-[90%] md:grid-cols-2 gap-2">
			<div className="md:border-r h-full md:border-gray-300 pr-6">
				<div className="h-max">
					<Chart sensors={pot.sensors} />
				</div>
			</div>
			<div className="pl-3 flex flex-col justify-between h-full pb-5">
				<div className="flex flex-col gap-[2%] h-full pb-2">
					<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2">
						{" "}
						<Settings />
						Controls
					</h2>

					<ul className="py-4 pr-4 h-full overflow-auto mb-1">
						{updateData?.map((x) => (
							<ControlCard
								control={x}
								key={x.serialNumber}
								isEditting={x.isEditing}
								editStateHandler={editStateHandler}
								updateControlValue={updateControlValue}
							/>
						))}
					</ul>

					<div
						className={`flex gap-2 transition-opacity duration-300 ${
							updateData.some((x) => x.isEditing)
								? "opacity-100"
								: "opacity-0"
						}`}
					>
						<Button
							variant="secondary"
							onClick={() => setUpdateData(initialControls)}
						>
							Cancel
						</Button>
						<Button variant="blue" onClick={saveUpdate}>Save</Button>
					</div>
				</div>

				<p
					className="text-sm hover:underline hover:text-black text-muted-foreground transition-all duration-100"
					onClick={() => setTab(tabOptions.advancedSettings)}
				>
					Advanced Settings
				</p>
			</div>
		</div>
	);
};
