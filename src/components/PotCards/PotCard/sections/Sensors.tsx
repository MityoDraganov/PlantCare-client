import { useEffect, useState } from "react";
import { SensorDto } from "../../../../dtos/sensors.dto";
import useFormData from "../../../../hooks/useForm";
import { InputGroup, orientationOpts } from "../../../InputGroup";
import { Chart } from "../../cards/Chart";

import { updateSensor } from "../../../../api/requests";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../../ui/collapsible";
import { ChevronsUpDown, Store } from "lucide-react";
import { EditBtnsComponent } from "../../../EditBtnsComponent";
import toast from "react-hot-toast";
import { Button } from "../../../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../../ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { Marketplace } from "../../../../Pages/Marketplace/Marketplace";

export const Sensors = ({ sensors }: { sensors: SensorDto[] }) => {
	const [isEditting, setIsEditting] = useState<boolean>(false);
	const [updateData, _, setUpdateData] = useFormData(sensors);
	const [isMarketplaceDialogOpen, setIsMarketplaceDialogOpen] =
		useState<boolean>(false);

		const handleUpdateSensor = (sensorId: number, newValue: string) => {
			// Find the index of the sensor to update
			const sensorToUpdateIndex = updateData.findIndex((x) => x.id === sensorId);
			if (sensorToUpdateIndex === -1) return;
		
			// Update the sensor in the array at the found index
			const updatedSensor = { ...updateData[sensorToUpdateIndex], driverUrl: newValue };
			const updatedData = [...updateData];
			updatedData[sensorToUpdateIndex] = updatedSensor;
		
			// Update the state with the modified array
			setUpdateData(updatedData);
			setIsMarketplaceDialogOpen(false);
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

	const handleSaveUpdate = async () => {
		try {
			await updateSensor(updateData); // Save the updates to the server or backend

			// After saving, filter the sensors again to move updated sensors
			const updatedSensors = updateData.map((sensor) => {
				return sensor.driverUrl
					? { ...sensor, driverUrl: sensor.driverUrl }
					: sensor;
			});

			setUpdateData(updatedSensors);
			setIsEditting(false);

			toast.success("Update saved");
		} catch (error) {
			console.error("Error saving the update:", error);
		}
	};

	const cancelUpdate = () => {
		setUpdateData(sensors); // Reset to the original sensor data if update is canceled
		setIsEditting(false); // Disable editing mode
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
					<div className="flex flex-col gap-4">
						<ul className="flex flex-col gap-2">
							{sensors.some((sensor) => !sensor.driverUrl) ? (
								sensors
									.filter((sensor) => !sensor.driverUrl)
									.map((sensor) => {
										const updateValueSensor =
											updateData.find(
												(x) => x.id === sensor.id
											);
										if (!updateValueSensor) return;

										return (
											<li
												key={updateValueSensor.id}
												className="flex gap-2  justify-between w-full items-center"
											>
												<InputGroup
													className="w-1/3 h-full"
													orientation={
														orientationOpts.horizontal
													}
													label={
														updateValueSensor.alias
															? updateValueSensor.alias
															: updateValueSensor.serialNumber
													}
													isEditing={true}
													value={
														updateValueSensor.driverUrl
													}
													key={updateValueSensor.id}
													onChange={(e) =>
														handleUpdateSensor(
															updateValueSensor.id,
															e.target.value
														)
													}
													placeHolder=""
													type="url"
													id={updateValueSensor.id}
												/>
												<Dialog
													open={
														isMarketplaceDialogOpen
													}
													onOpenChange={
														setIsMarketplaceDialogOpen
													}
												>
													<DialogTrigger>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger>
																	<Button
																		size="icon"
																		className="aspect-square"
																	>
																		<Store />
																	</Button>
																</TooltipTrigger>
																<TooltipContent>
																	Browse
																	marketplace
																	for drivers
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</DialogTrigger>
													<DialogContent className="w-[90%] h-[90%]">
														<Marketplace
															asChild
															handleUpdateSensor={
																handleUpdateSensor
															}
															sensorId={
																updateValueSensor.id
															}
														/>
													</DialogContent>
												</Dialog>
											</li>
										);
									})
							) : (
								<li className="text-muted-foreground">
									No sensors without a driver.
								</li>
							)}
						</ul>

						<Collapsible className="flex flex-col gap-2">
							<CollapsibleTrigger className="text-muted-foreground flex gap-4 ">
								View other sensors
								<ChevronsUpDown />
							</CollapsibleTrigger>
							<CollapsibleContent>
								<ul className="flex flex-col gap-2">
									{sensors.some(
										(sensor) => sensor.driverUrl
									) ? (
										sensors
											.filter(
												(sensor) => sensor.driverUrl
											)
											.map((sensor) => {
												const updateValueSensor =
													updateData.find(
														(x) =>
															x.id === sensor.id
													);
												if (!updateValueSensor) return;

												return (
													<li
														key={
															updateValueSensor.id
														}
														className="flex gap-2 justify-between w-full items-center"
													>
														<InputGroup
															className="w-1/3"
															orientation={
																orientationOpts.horizontal
															}
															label={
																updateValueSensor.alias
																	? updateValueSensor.alias
																	: updateValueSensor.serialNumber
															}
															isEditing={true}
															value={
																updateValueSensor.driverUrl
															}
															key={
																updateValueSensor.id
															}
															onChange={(e) =>
																handleUpdateSensor(
																	updateValueSensor.id,
																	e.target
																		.value
																)
															}
															placeHolder=""
															type="url"
															id={
																updateValueSensor.id
															}
														/>
														<Dialog
															open={
																isMarketplaceDialogOpen
															}
															onOpenChange={
																setIsMarketplaceDialogOpen
															}
														>
															<DialogTrigger>
																<TooltipProvider>
																	<Tooltip>
																		<TooltipTrigger>
																			<Button
																				size="icon"
																				className="aspect-square"
																			>
																				<Store />
																			</Button>
																		</TooltipTrigger>
																		<TooltipContent>
																			Browse
																			marketplace
																			for
																			drivers
																		</TooltipContent>
																	</Tooltip>
																</TooltipProvider>
															</DialogTrigger>
															<DialogContent className="w-[90%] h-[90%]">
																<Marketplace
																	asChild
																	handleUpdateSensor={
																		handleUpdateSensor
																	}
																	sensorId={
																		sensor.id
																	}
																/>
															</DialogContent>
														</Dialog>
													</li>
												);
											})
									) : (
										<li className="text-muted-foreground">
											No sensors with a driver.
										</li>
									)}
								</ul>
							</CollapsibleContent>
						</Collapsible>

						<EditBtnsComponent
							isEditing={isEditting}
							saveUpdate={handleSaveUpdate}
							cancelUpdate={cancelUpdate}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
