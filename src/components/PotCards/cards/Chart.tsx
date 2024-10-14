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
import { SensorDialog } from "../../dialogs/sensorDialog";

interface ChartData {
	time: string;
	value: number;
}

interface ChartProps {
	sensors: SensorDto[]; // Array of sensor data
}

// Helper function to render dot and status text
const renderStatusWithDot = (status: boolean) => {
	const colorClass = status ? "bg-green-500" : "bg-red-500"; // green for connected, red for disconnected
	const statusText = status ? "Connected" : "Disconnected"; // status text

	return (
		<span className="flex items-center gap-2">
			<span className={`h-2 w-2 rounded-full ${colorClass}`} />
			<span>{statusText}</span>
		</span>
	);
};

export const Chart = ({ sensors }: ChartProps) => {
	const [selectedSensor, setSelectedSensor] = useState<SensorDto | undefined>(
		sensors[0]
	);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	// Update chart data when the selected sensor changes
	useEffect(() => {
		if (selectedSensor) {
			const processedData = selectedSensor.measurements.map(
				(measurement) => {
					const date = new Date(measurement.CreatedAt);
					const hours = date.getHours() % 12 || 12;
					const period = date.getHours() < 12 ? "AM" : "PM";

					const currentDate = date.toLocaleDateString(undefined, {
						month: "short",
						day: "numeric",
					});
					const time = `${hours} ${period}`;

					const timeLabel = `${currentDate}, ${time}`;

					return {
						time: timeLabel,
						value: measurement.value,
					};
				}
			);

			setChartData(processedData.reverse());
		}
	}, [selectedSensor, sensors]);

	// Generate the chart configuration
	const chartConfig: ChartConfig | undefined = selectedSensor
		? {
				label: `
            ${
				selectedSensor.alias
					? selectedSensor.alias
					: selectedSensor.serialNumber
			}
          `,

				color: "hsl(var(--chart-1))",
		  }
		: undefined;

	return (
		<Card className="h-full flex flex-col p-0">
			<CardHeader className="p-3">
				<CardTitle>
					<Select
						onValueChange={(value: string) => {
							const sensor: SensorDto | undefined = sensors.find(
								(x: SensorDto) =>
									(x.alias ? x.alias : x.serialNumber) ===
									value
							);
							if (sensor) {
								setSelectedSensor(sensor);
							}
						}}
					>
						<div className="flex justify-between items-center w-full">
							<div
								className={`flex gap-2 items-center ${
									selectedSensor && !selectedSensor.IsAttached
										? "opacity-50"
										: ""
								}`}
							>
								<SelectTrigger className="w-full md:w-fit">
									<SelectValue
										placeholder={
											<p className="flex gap-2 p-1">
												<span className="flex gap-2 items-baseline">
													{chartConfig?.label}
												</span>
												<span className="font-normal pr-2">
													Chart
												</span>
											</p>
										}
									/>
								</SelectTrigger>
								{selectedSensor && (
									<span className="text-sm font-normal ">
										{renderStatusWithDot(
											selectedSensor.IsAttached
										)}
									</span>
								)}
							</div>
							{selectedSensor && (
								<SensorDialog sensor={selectedSensor} />
							)}
						</div>
						<SelectContent>
							{sensors.map((sensor) => (
								<SelectItem
									value={
										sensor.alias
											? sensor.alias
											: sensor.serialNumber
									}
									className={`${
										!sensor.IsAttached ? "opacity-50" : ""
									}`}
									key={sensor.id}
								>
									<div className="flex items-center gap-2">
										<p>
											{sensor.alias
												? sensor.alias
												: sensor.serialNumber}
										</p>
										{renderStatusWithDot(sensor.IsAttached)}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
