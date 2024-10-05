import { useEffect, useState } from "react";
import { SensorDto } from "../../../../dtos/sensors.dto";
import useFormData from "../../../../hooks/useForm";
import { InputGroup, orientationOpts } from "../../../InputGroup";
import { Chart } from "../../cards/Chart";
import { EditBtnsComponent } from "../../../editBtnsComponent";
import { updateSensor } from "../../../../api/requests";

export const Sensors = ({ sensors }: { sensors: SensorDto[] }) => {
	// Filter sensors that do not have a driver
	const sensorsWithoutDriver = sensors.filter(
		(sensor) => !sensor.driverUrl
	);

	const [isEditting, setIsEditting] = useState<boolean>(false);

	const [updateData, _, setUpdateData] =
		useFormData(sensorsWithoutDriver);

	const handleUpdateSensor = (sensorId: number, newValue: string) => {
		// Find the index of the sensor to update
		const updatedSensors = updateData.map((sensor) =>
			sensor.id === sensorId ? { ...sensor, driverUrl: newValue } : sensor
		);

		// Update the state with the modified sensor data
		setUpdateData(updatedSensors);
	};

	useEffect(() => {
		const isModified = updateData.some((updatedSensor) => {
			const originalSensor = sensors.find(
				(sensor) => sensor.id === updatedSensor.id
			);
			return originalSensor?.driverUrl !== updatedSensor.driverUrl;
		});

		setIsEditting(isModified);
	}, [updateData, sensors]);

	const handleSaveUpdate = async() => {
		await updateSensor(updateData)
		setUpdateData(sensorsWithoutDriver);
	};

	const cancelUpdate = () => {
		setUpdateData(sensorsWithoutDriver);
	};

	return (
		<div className="md:border-r h-full md:border-gray-300 md:pr-6">
			<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2 mb-4 pl-2">
				Sensors
			</h2>
			<div className="h-full flex flex-col gap-4">
				<div className="h-max">
					<Chart sensors={sensors} />
				</div>

				<div>
					<h2 className="text-lg font-medium border-b mb-2">
						Sensors, with no provided driver
					</h2>
					{/* Display sensor aliases without drivers */}
					<ul className="flex flex-col gap-2">
						{sensorsWithoutDriver.length > 0 ? (
							updateData.map((sensor) => (
								<li
									key={sensor.id}
									className="flex justify-between w-full items-center"
								>
									<InputGroup
										className="w-1/3"
										orientation={orientationOpts.horizontal}
										label={sensor.alias ?? ""}
										isEditing={true}
										value={sensor.driverUrl}
										key={sensor.id}
										onChange={(e) =>
											handleUpdateSensor(
												sensor.id,
												e.target.value
											)
										}
										placeHolder=""
										type="url"
										id={sensor.id}
									/>
								</li>
							))
						) : (
							<li>No sensors available</li> // Message if no sensors found
						)}
						{isEditting && (
							<EditBtnsComponent
								isEditing={isEditting}
								saveUpdate={handleSaveUpdate}
								cancelUpdate={cancelUpdate}
							/>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
