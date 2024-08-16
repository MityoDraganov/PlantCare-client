import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
} from "recharts";
import { useState, useEffect } from "react";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from "../../ui/chart";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Beaker, Droplets, SunMedium, Thermometer } from "lucide-react";
import { SensorDataResponseDto } from "../../../dtos/SensorData.dto";

enum ChartDataTypes {
	Temperature = 0,
	Moisture = 1,
	WaterLevel = 2,
	SunExposure = 3,
}

interface ChartData {
	time: string;
	value: number;
}

const chartConfigs: Record<ChartDataTypes, ChartConfig> = {
	[ChartDataTypes.WaterLevel]: {
		label: `Water Tank Level`,
		color: "hsl(var(--chart-2))",
		icon: Beaker,
	},
	[ChartDataTypes.Temperature]: {
		label: "Temperature",
		color: "hsl(var(--chart-1))",
		icon: Thermometer,
	},
	[ChartDataTypes.Moisture]: {
		label: "Moisture",
		color: "hsl(var(--chart-6))",
		icon: Droplets,
	},
	[ChartDataTypes.SunExposure]: {
		label: "Sun Exposure",
		color: "hsl(var(--chart-4))",
		icon: SunMedium,
	},
};

interface ChartProps {
	sensorData: SensorDataResponseDto[]; // Array of sensor data
}

export const Chart = ({ sensorData }: ChartProps) => {
	const [type, setType] = useState<ChartDataTypes>(ChartDataTypes.Moisture);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		const processedData = sensorData.map((data) => {
      const date = new Date(data.createdAt)
			const hours = date.getHours() % 12 || 12; // 12-hour format
			const period = date.getHours() < 12 ? "AM" : "PM";
			const time = `${hours} ${period}`;

			return {
				time,
				value:
					type === ChartDataTypes.Temperature
						? data.temperature
						: type === ChartDataTypes.Moisture
						? data.moisture
						: type === ChartDataTypes.WaterLevel
						? data.waterLevel
						: data.sunExposure,
			};
		});

		setChartData(processedData.reverse());
	}, [type, sensorData]);

	const chartConfig = chartConfigs[type];
	const Icon = chartConfig.icon;

	return (
		<Card className="h-full flex flex-col p-0">
			<CardHeader className="p-3">
				<Select
					onValueChange={(value: string) =>
						setType(parseInt(value) as ChartDataTypes)
					}
				>
					<CardTitle>
						<SelectTrigger className="w-fit">
							<SelectValue
								placeholder={
									<p className="flex gap-2 p-1">
										<span className="flex gap-2 items-baseline">
											{Icon && (
												<Icon className="h-4 w-4" />
											)}
											{chartConfig.label}
										</span>
										<span className="font-normal pr-2">
											Chart
										</span>
									</p>
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{Object.keys(chartConfigs).map(
								(key: string, index: number) => {
									const config = chartConfigs[parseInt(key) as ChartDataTypes];

									const Icon = config.icon;
									return (
										<SelectItem value={index.toString()} key={key}>
											<div className="flex items-center gap-2">
												{Icon && (
													<Icon className="h-4 w-4" />
												)}
												<p>{config.label}</p>
											</div>
										</SelectItem>
									);
								}
							)}
						</SelectContent>
					</CardTitle>
				</Select>
			</CardHeader>
			<CardContent className="h-[90%] my-auto">
				<ChartContainer config={chartConfig} className="w-full min-h-1/4 max-h-[90%]">
				
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
			</CardContent>
		</Card>
	);
};
