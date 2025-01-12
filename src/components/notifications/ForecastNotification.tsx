import { Thermometer, TreesIcon as Plant } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ForecastPrediction {
	date: string;
	predictions: {
		temp: number;
	};
}

interface ForecastNotificationProps {
	predictions: ForecastPrediction[];
	isRead: boolean;
}

export const ForecastNotification = ({
	predictions,
	isRead,
}: ForecastNotificationProps) => {
	// Format date to display as "Mon, Jan 12"
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<Card
			className={`w-full max-w-md bg-white shadow-lg ${
				isRead ? "opacity-50" : ""
			}`}
		>
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-xl">
					<Plant className="h-6 w-6 text-green-600" />
					    Forecast Notification
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-base text-muted-foreground">
					Here's your plant's forecast for the next few
					days
				</p>

				<div className="space-y-3">
					{predictions.map((prediction, index) => (
						<div
							key={index}
							className={`flex items-center justify-between rounded-lg p-3 ${
								index === 0
									? "bg-orange-50 border border-orange-100"
									: "bg-slate-50"
							}`}
						>
							<div className="flex items-center gap-3">
								<Thermometer
									className={`h-5 w-5 ${
										index === 0
											? "text-orange-500"
											: "text-slate-400"
									}`}
								/>
								<div className="flex flex-col">
									<span className="font-medium text-slate-900">
										{formatDate(prediction.date)}
									</span>
									<span className="text-xs text-slate-500">
										{index === 0
											? "Today"
											: index === 1
											? "Tomorrow"
											: "In 2 days"}
									</span>
								</div>
							</div>
							<div className="flex items-baseline gap-1">
								<span className="text-lg font-semibold text-slate-900">
									{prediction.predictions.temp}
								</span>
								<span className="text-sm text-slate-600">
									°C
								</span>
							</div>
						</div>
					))}
				</div>


			</CardContent>
		</Card>
	);
};
