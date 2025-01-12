import {  Droplet, TreesIcon as Plant, Thermometer } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { MeasuremntDto } from "../../dtos/measurements.dto";
import { useContext } from "react";
import { PotContext } from "../../contexts/PotContext";
import { PlantHealthDialog } from "../dialogs/PlantHealthDialog";

interface PlantMeasurementNotificationProps {
	measurementGroupId: number;
	cropPotId: number;
	isRead: boolean;
	measurements: MeasuremntDto[];
}

export const MeasurementNotification = ({
	measurementGroupId,
	cropPotId,
	isRead,
	measurements,
}: PlantMeasurementNotificationProps) => {
	const { cropPots } = useContext(PotContext);
	if (!cropPots) return null;

	const cropPot = cropPots.find((pot) => pot.id === cropPotId);
	console.log(measurements);
	console.log(cropPot?.sensors);

	const getSensorIcon = (sensorId: number) => {
		const sensor = cropPot?.sensors.find((x) => x.id === sensorId);
		return sensor?.alias?.toLowerCase().includes("temperature") ? (
			<Thermometer className="h-5 w-5 text-orange-500" />
		) : (
			<Droplet className="h-5 w-5 text-blue-500" />
		);
	};
	return (
		<Card className={`w-full max-w-md 	${isRead ? "opacity-50" : ""}`}>
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2">
					<Plant className="h-5 w-5" />
					New Measurement for{" "}
					{cropPot?.alias ? cropPot?.alias : cropPotId}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<p className="text-sm text-muted-foreground">
					We've detected a new measurement for your{" "}
					{cropPots.find((pot) => pot.id === cropPotId)?.alias
						? cropPots.find((pot) => pot.id === cropPotId)?.alias
						: cropPotId}
					.
				</p>

				<div className="flex flex-col gap-2 mt-4">
					{measurements?.map((measurement, index) => {
						const sensor = cropPot?.sensors.find(
							(x) => x.id === measurement.sensorId
						);
						return (
							<div
								key={index}
								className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
							>
								<div className="flex items-center gap-3">
									{getSensorIcon(measurement.sensorId)}
									<span className="font-medium text-slate-900">
										{sensor?.alias ||
											`Sensor ${measurement.sensorId}`}
									</span>
								</div>
								<p className="text-lg font-semibold text-slate-600 flex items-center gap-1">
									<span>{measurement.value}</span>
									<span>
										{sensor?.alias
											?.toLowerCase()
											.includes("temperature")
											? "°C"
											: "%"}
									</span>
								</p>
							</div>
						);
					})}
				</div>
			</CardContent>
			<CardFooter className="felx flex-col gap-2">
					<PlantHealthDialog measurementGroupId={measurementGroupId}/>
				<p className="text-xs text-center text-muted-foreground mt-2">
					Your photos help our AI learn and provide personalized care
					recommendations for your plant's optimal growth
				</p>
			</CardFooter>
		</Card>
	);
};
