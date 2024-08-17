import { Thermometer } from "lucide-react";
import { InfoCard } from "./InfoCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useState } from "react";

export const TemperatureCard = ({
  potTemperature,
}: {
  potTemperature: number;
}) => {
  const [selectedMetricSystem, setSelectedMetricSystem] = useState<
    "celsius" | "fahrenheit"
  >("celsius");

  function celsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  return (
    <InfoCard
      icon={<Thermometer />}
      title="Pot temperature"
      mainContent={
        <span className="flex items-center justify-center">
          <span>
            {selectedMetricSystem === "celsius"
              ? potTemperature.toFixed(1)
              : celsiusToFahrenheit(potTemperature).toFixed(1)}
          </span>
          <Select
            onValueChange={(value) =>
              setSelectedMetricSystem(value as "celsius" | "fahrenheit")
            }
          >
            <SelectTrigger className="border-none focus:outline-none focus:ring-0 focus:ring-offset-0 px-1">
              <SelectValue placeholder={selectedMetricSystem === "celsius" ? "°C" : "°F"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="celsius">°C</SelectItem>
              <SelectItem value="fahrenheit">°F</SelectItem>
            </SelectContent>
          </Select>
        </span>
      }
    />
  );
};
