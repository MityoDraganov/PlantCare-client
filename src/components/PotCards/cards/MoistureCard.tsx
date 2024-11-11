import { Thermometer } from "lucide-react";
import { InfoCard, InfoCardProps } from "./InfoCard";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { useState } from "react";

interface MoistureCardProps extends InfoCardProps {
	moisture?: number;
}

const title = "Moisture";

export const MoistureCard = ({
	moisture,
	...props
}: MoistureCardProps) => {
	const [selectedMetricSystem, setSelectedMetricSystem] = useState<
		"celsius" | "fahrenheit"
	>("celsius");

	return (
		<InfoCard
			icon={<Thermometer />}
			title={title}
			mainContent={
				<span className="flex items-center justify-center">
					<span>
						{moisture}%
					</span>
					<Select
						onValueChange={(value) =>
							setSelectedMetricSystem(
								value as "celsius" | "fahrenheit"
							)
						}
					>
						<SelectTrigger className="border-none focus:outline-none focus:ring-0 focus:ring-offset-0 px-1">
							<SelectValue
								placeholder={
									selectedMetricSystem === "celsius"
										? "°C"
										: "°F"
								}
							/>
						</SelectTrigger>
					<SelectContent>
							<SelectItem value="celsius">°C</SelectItem>
							<SelectItem value="fahrenheit">°F</SelectItem>
						</SelectContent>
					</Select>
				</span>
			}
			{...props}
		/>
	);
};