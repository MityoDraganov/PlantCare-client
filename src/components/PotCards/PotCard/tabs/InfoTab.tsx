import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { tabOptions } from "../PotCard";
import useFormData from "../../../../hooks/useForm";
import { ControlDto, ControlRequestDto } from "../../../../dtos/controls.dto";
import { Sensors } from "../sections/Sensors";
import { Controls } from "../sections/Controls";
import { EditBtnsComponent } from "../../../EditBtnsComponent";
import toast from "react-hot-toast";
import { useLoading } from "../../../../contexts/LoadingContext";
import { measurePot, updateSensor } from "../../../../api/requests";
import { SensorDto, SensorRequestDto } from "../../../../dtos/sensors.dto";
import { CropPotResponseDto } from "../../../../dtos/CropPot.dto";
import { Button } from "../../../ui/button";

export interface ControlDtoWithEditing extends ControlDto {
	isEditing: boolean;
}

export interface PotAttachments {
	sensorDtos: SensorDto[];
	controlDtos: ControlDtoWithEditing[];
}

export interface PotAttachmentsRequest{
	sensorDtos: SensorRequestDto[];
	controlDtos: ControlRequestDto[];
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


	const [isEditting, setIsEditting] = useState<boolean>(false);

	const [updateData, _, setUpdateData] = useFormData<PotAttachments>({
		sensorDtos: pot.sensors,
		controlDtos: initialControls,
	});
	const [isMarketplaceDialogOpen, setIsMarketplaceDialogOpen] =
		useState<boolean>(false);

	//make a use effect to check if any of the fields of updateData defer from the original data
	//if they do, set isEditting to true
	useEffect(() => {
		const isDataChanged = JSON.stringify(updateData) !== JSON.stringify({
			sensorDtos: pot.sensors,
			controlDtos: initialControls
		});
	
		setIsEditting(isDataChanged);
	}, [updateData, pot.sensors, pot.controls]);
	
	const handleUpdateSensor = (sensorId: number, newValue: string) => {
		// Find the index of the sensor to update
		const sensorToUpdateIndex = updateData.sensorDtos.findIndex(
			(x) => x.id === sensorId
		);
		if (sensorToUpdateIndex === -1) return;

		// Update the sensor in the array at the found index
		const updatedSensor = {
			...updateData.sensorDtos[sensorToUpdateIndex],
			driverUrl: newValue,
		};
		const updatedData = {
			...updateData,
			sensorDtos: [
				...updateData.sensorDtos.slice(0, sensorToUpdateIndex),
				updatedSensor,
				...updateData.sensorDtos.slice(sensorToUpdateIndex + 1),
			],
		};

		// Update the state with the modified array
		setUpdateData(updatedData);
		setIsMarketplaceDialogOpen(false);
	};

	const handleUpdateControl = <K extends keyof ControlDtoWithEditing>(
		serialNumber: string,
		path: string[],
		value: ControlDtoWithEditing[K]
	) => {
		const controlToUpdateIndex = updateData.controlDtos.findIndex(
			(x) => x.serialNumber === serialNumber
		);
		if (controlToUpdateIndex === -1) return;

		// Creating deep copy of control object
		const updatedControl = {
			...updateData.controlDtos[controlToUpdateIndex],
		};
		let currentLevel: any = updatedControl;

		for (let i = 0; i < path.length - 1; i++) {
			const key = path[i];
			if (!currentLevel[key]) {
				currentLevel[key] = {}; // Ensure the nested structure exists
			}
			currentLevel = currentLevel[key];
		}

		const finalKey = path[path.length - 1];
		currentLevel[finalKey] = value;

		const updatedData = {
			...updateData,
			controlDtos: [
				...updateData.controlDtos.slice(0, controlToUpdateIndex),
				updatedControl,
				...updateData.controlDtos.slice(controlToUpdateIndex + 1),
			],
		};

		setUpdateData(updatedData);
	};

	const handleSaveUpdate = async () => {
		try {
			// Create a copy of updateData without the type field in sensorDtos
			
			const sanitizedUpdateData: PotAttachmentsRequest = {
				sensorDtos: updateData.sensorDtos.map(sensor => ({
					id: sensor.id,
					IsAttached: sensor.IsAttached,
					driverUrl: sensor.driverUrl,
					alias: sensor.alias,
					IsOfficial: sensor.IsOfficial,
					description: sensor.description,

				})),
				controlDtos: updateData.controlDtos.map((control) => {
					const { isEditing, serialNumber, ...rest } = control;
					return {...rest, maxValue: Number(rest.maxValue), minValue: Number(rest.minValue), dependantSensorSerial: rest.dependantSensor ? rest.dependantSensor.toString() : null};
				}),
			};
	
			console.log(sanitizedUpdateData);
			await updateSensor(sanitizedUpdateData); // Save the updates to the server or backend
	
			// After saving, filter the sensors again to move updated sensors
			const updatedSensors = updateData.sensorDtos.map((sensor) => {
				return sensor.driverUrl
					? { ...sensor, driverUrl: sensor.driverUrl }
					: sensor;
			});
	
			setUpdateData({
				sensorDtos: updatedSensors,
				controlDtos: updateData.controlDtos,
			});
			setIsEditting(false);
	
			toast.success("Update saved");
		} catch (error) {
			console.error("Error saving the update:", error);
		}
	};

	const cancelUpdate = () => {
		setUpdateData({
			sensorDtos: pot.sensors,
			controlDtos: initialControls,
		});
		setIsEditting(false); // Disable editing mode
	};

	// const handleSensorsManualUpdate = async () => {
	// 	measurePot(pot.id);
	// 	beginLoading();
	// };

	useEffect(() => {
		console.log(updateData);
	}, [updateData]);
	return (
		<div className="flex flex-col h-full">
			<div className="grid grid-cols-1 h-[90%] md:grid-cols-2 gap-2 w-full px-5 items-center">
				<Sensors
					sensors={pot.sensors}
					updateData={updateData.sensorDtos}
					handleUpdateSensor={handleUpdateSensor}
					isMarketplaceDialogOpen={isMarketplaceDialogOpen}
					setIsMarketplaceDialogOpen={setIsMarketplaceDialogOpen}
				/>
				<Controls
					updateData={updateData.controlDtos}
					handleUpdateControl={handleUpdateControl}
					cancelUpdate={cancelUpdate}
					setTab={setTab}
				/>
			</div>

			<div className="mr-2 pb-2 ml-auto">
				<EditBtnsComponent
					isEditing={isEditting}
					saveUpdate={handleSaveUpdate}
					cancelUpdate={cancelUpdate}
				/>

				{!isEditting && (
					<Button onClick={handleSaveUpdate}>
						Re-Upload Drivers
					</Button>)}
			</div>
		</div>
	);
};
