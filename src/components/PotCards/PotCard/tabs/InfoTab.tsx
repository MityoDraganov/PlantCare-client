import { CropPotResponseDto } from "../../../../dtos/cropPot.dto";
import { Dispatch, SetStateAction, useEffect } from "react";
import { tabOptions } from "../PotCard";
import useFormData from "../../../../hooks/useForm";
import { ControlDto } from "../../../../dtos/controls.dto";
import { Sensors } from "../sections/Sensors";
import { Controls } from "../sections/Controls";

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

	useEffect(() => {
		console.log(updateData);
	}, [updateData]);

	const cancelUpdate = () => {};

	return (
		<div className="grid grid-cols-1 h-[90%] md:grid-cols-2 gap-2 w-full px-5 items-center md:w-2/3">
			<Sensors sensors={pot.sensors} potId={pot.id}/>
			<Controls
				updateData={updateData}
				setUpdateData={setUpdateData}
				cancelUpdate={cancelUpdate}
				setTab={setTab}
			/>
		</div>
	);
};
