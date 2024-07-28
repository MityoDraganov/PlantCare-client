import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BatteryMedium, Beaker, Thermometer } from "lucide-react";

export enum ChartDataTypes {
  temperature = "temperature",
  waterTankCapacity = "waterTankCapacity",
  batteryLevel = "batteryLevel",
}

interface ChartData {
  time: string;
  value: number; // Change value to number for consistency
}

const generateMockData = (type: ChartDataTypes) => {
  const now = new Date();
  const data: ChartData[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000);
    const value = Math.floor(Math.random() * 100);
    data.push({
      time: date.toISOString().slice(11, 16),
      value: type === ChartDataTypes.temperature ? value : value, // Keep value as number
    });
  }
  return data.reverse();
};

const chartConfigs: Record<ChartDataTypes, ChartConfig> = {
  [ChartDataTypes.waterTankCapacity]: {
    label: `Water Tank Level`,
    color: "hsl(var(--chart-2))",
    icon: Beaker,
  },
  [ChartDataTypes.temperature]: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
    icon: Thermometer
  },
  [ChartDataTypes.batteryLevel]: {
    label: "Battery Level",
    color: "hsl(var(--chart-6))",
    icon: BatteryMedium
  },
};

export const Chart = () => {
  const [type, setType] = useState<ChartDataTypes>(
    ChartDataTypes.waterTankCapacity
  );
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    setChartData(generateMockData(type));
  }, [type]);

  const chartConfig = chartConfigs[type];
  const Icon = chartConfig.icon;


  return (
    <Card className="h-full">
      <CardHeader>
        <Select
          onValueChange={(value: string) => setType(value as ChartDataTypes)}
        >
          <CardTitle>
          <SelectTrigger className="w-fit">
              <SelectValue
                placeholder={
                  <p className="flex gap-2 text-lg p-1">
                    <span className="flex gap-2 items-baseline">
                      {Icon && <Icon className="h-4 w-4" />}
                      {chartConfig.label}
                    </span>
                    <span className="font-normal pr-2">Chart</span>
                  </p>
                }
              />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(chartConfigs).map((key: string) => {
                const config = chartConfigs[key as ChartDataTypes];
                const Icon = config.icon;
                return (
                  <SelectItem value={key} key={key}>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <p>{config.label}</p>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </CardTitle>
          <SelectContent>
            {Object.keys(chartConfigs).map((key: string) => {
              const config = chartConfigs[key as ChartDataTypes];
              const Icon = config.icon;
              return (
                <SelectItem value={key} key={key}>
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    <p>{config.label}</p>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <CardDescription>Last 12 Hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[25vh]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={8} fill={chartConfig.color} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
