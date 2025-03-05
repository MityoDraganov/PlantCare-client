import { Dispatch, SetStateAction } from "react";
import { SensorDto } from "../../../../dtos/sensors.dto";
import { InputGroup, orientationOpts } from "../../../InputGroup";
import { Chart } from "../../cards/Chart";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../../ui/collapsible";
import { ChevronsUpDown, Store } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../../ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { Marketplace } from "../../../../Pages/Marketplace/Marketplace";
import { Button } from "../../../ui/button";

export const Sensors = ({
	sensors,
	updateData,
	handleUpdateSensor,
	isMarketplaceDialogOpen, 
	setIsMarketplaceDialogOpen
}: {
	sensors: SensorDto[];
	updateData: SensorDto[];
	handleUpdateSensor: (sensorId: number, newValue: string) => void;
	isMarketplaceDialogOpen: boolean;
	setIsMarketplaceDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<div className="md:border-r h-full md:border-gray-300 md:pr-6">
			<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2 mb-4 pl-2 justify-between">
				<p>Sensors</p>
				{/* <Button
					size="icon"
					onClick={handleSensorsManualUpdate}
					disabled={isLoading}
				>
					<RefreshCcw className={`${isLoading ? "animate-spin" : ""}`}/>
				</Button> */}
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
					</div>
				</div>
			</div>
		</div>
	);
};