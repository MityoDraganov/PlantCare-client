import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from "../../../components/ui/chart";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { SensorDto } from "../../../dtos/sensors.dto";
import { Pencil } from "lucide-react";
import { Input } from "../../ui/input";
import useFormData from "../../../hooks/useForm";
import { Button } from "../../ui/button";

interface ChartData {
	time: string;
	value: number;
}

interface ChartProps {
	sensors: SensorDto[]; // Array of sensor data
}

export const Chart = ({ sensors }: ChartProps) => {
	const [selectedSensor, setSelectedSensor] = useState<SensorDto | undefined>(
		sensors[0]
	);
	const [updateData, setPartialChange, setUpdateData] = useFormData(
		sensors[0]
	);

	const [chartData, setChartData] = useState<ChartData[]>([]);

	const [isEditingInterval, setIsEditingInterval] = useState<boolean>(false);

	useEffect(() => {
		if (selectedSensor) {
			const processedData = selectedSensor.measurements.map(
				(measurement) => {
					const date = new Date(measurement.CreatedAt);
					const hours = date.getHours() % 12 || 12; // 12-hour format
					const period = date.getHours() < 12 ? "AM" : "PM";
					const time = `${hours} ${period}`;

					return {
						time,
						value: measurement.value,
					};
				}
			);

			setChartData(processedData.reverse());
		}
	}, [selectedSensor, sensors]);

	const saveUpdate = () => {
		//await updateControllSetting(updateData);

		//const newData = updateData.map((x) => ({ ...x, isEditing: false }));

		//setUpdateData(newData);
		setIsEditingInterval(false);
	};

	const chartConfig: ChartConfig | undefined = selectedSensor
		? {
				label: selectedSensor.alias,
				color: "hsl(var(--chart-1))",
		  }
		: undefined;

	return (
		<Card className="h-full flex flex-col p-0">
			<CardHeader className="p-3">
				<CardTitle>
					<Select
						onValueChange={(value: string) => {
							const sensor = sensors.find(
								(x) => x.alias === value
							);
							if (sensor) setSelectedSensor(sensor);
						}}
					>
						<SelectTrigger className="w-full md:w-fit">
							<SelectValue
								placeholder={
									<p className="flex gap-2 p-1">
										<span className="flex gap-2 items-baseline">
											{chartConfig?.icon && (
												<chartConfig.icon className="h-4 w-4" />
											)}
											{chartConfig?.label}
										</span>
										<span className="font-normal pr-2">
											Chart
										</span>
									</p>
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{sensors.map((sensor) => (
								<SelectItem
									value={sensor.alias}
									key={sensor.id}
								>
									<div className="flex items-center gap-2">
										{/* <sensor.icon className="h-4 w-4" /> */}
										<p>{sensor.alias}</p>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="flex flex-col pl-2 pb-4">
						<div>
							<p
								className={`text-base font-normal flex gap-2 items-center ${
									!isEditingInterval
										? "text-muted-foreground"
										: ""
								} pl-2 py-1`}
							>
								Sensor measures every{" "}
								{isEditingInterval ? (
									<Input
										className="w-fit "
										type="time"
										value={updateData?.measuremntInterval}
										onChange={setPartialChange}
										id="measuremntInterval"
									/>
								) : (
									<span className="font-semibold text-lg">
										{updateData?.measuremntInterval}
									</span>
								)}
								hours
							</p>
							{!isEditingInterval && (
								<Pencil
									onClick={() =>
										setIsEditingInterval(!isEditingInterval)
									}
								/>
							)}
						</div>

						<div
							className={`flex gap-2 transition-opacity duration-300 ${
								isEditingInterval ? "opacity-100" : "opacity-0"
							}`}
						>
							<Button
								variant="secondary"
								onClick={() => {
									if (selectedSensor)
										setUpdateData(selectedSensor);

									setIsEditingInterval(false);
								}}
							>
								Cancel
							</Button>
							<Button variant="blue" onClick={saveUpdate}>
								Save
							</Button>
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="h-[90%] my-auto">
				{chartConfig && (
					<ChartContainer
						config={chartConfig}
						className="w-full min-h-1/4 max-h-[90%]"
					>
						<BarChart data={chartData}>
							<CartesianGrid vertical={true} />
							<XAxis
								dataKey="time"
								tickLine={false}
								tickMargin={10}
								axisLine={true}
							/>
							<YAxis tickLine={false} axisLine={false} />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent />}
							/>
							<Bar
								dataKey="value"
								radius={8}
								fill={chartConfig.color}
							/>
						</BarChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
};
