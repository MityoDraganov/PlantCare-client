import { Filter } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import { getAllDrivers } from "../../api/requests";
import { MarketplaceCard } from "./components/MarketplaceCard";
import { DriverDto } from "../../dtos/driver.dto";
import { UploadDialog } from "./components/UploadDialog";
import { useTranslation } from "react-i18next";

export const Marketplace = ({
	asChild,
	handleUpdateSensor,
	sensorId,
}: {
	asChild?: boolean;
	handleUpdateSensor?: (sensorId: number, newValue: string) => void;
	sensorId?: number;
}) => {
	const [drivers, setDrivers] = useState<DriverDto[]>();
	const { t } = useTranslation();
	useEffect(() => {
		(async () => {
			setDrivers(await getAllDrivers());
		})();
	}, []);

	console.log(drivers);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-col w-full p-4 gap-4">
				{!asChild && (
					<header className="text-center mb-4 mt-4">
						<h1 className="text-2xl">
							PlantsCare -{" "}
							<span className="font-medium">
								{t("marketplace.header")}
							</span>
						</h1>
						<p>{t("marketplace.subheader")}</p>
					</header>
				)}

				<Card className="w-[95%] mx-auto h-max relative px-3 pt-2 flex flex-col gap-2 pb-5">
					<Select>
						<SelectTrigger
							className="w-[40%] md:w-[10%] mr-0 ml-auto"
							icon={Filter}
						>
							<SelectValue
								placeholder={t("marketplace.sort.sortBy")}
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="official">
								{t("marketplace.sort.official")}
							</SelectItem>
							<SelectItem value="mostPopular">
								{t("marketplace.sort.mostPopular")}
							</SelectItem>
							<SelectItem value="mostPopular">
								{t("marketplace.sort.leastPopular")}
							</SelectItem>
						</SelectContent>
					</Select>
					<CardContent
						className={` flex gap-3 flex-wrap p-0  overflow-y-auto ${
							asChild
								? "h-[calc(100vh-13rem)]"
								: "h-[calc(100vh-20rem)] md:h-[calc(100vh-18rem)]"
						} `}
					>
						{drivers ? (
							drivers.map((x) => (
								<MarketplaceCard
									key={x.id}
									driverDto={x}
									asChild={asChild}
									handleUpdateSensor={handleUpdateSensor}
									sensorId={sensorId}
								/>
							))
						) : (
							<p>{t("marketplace.noDriversAvailable")}!</p>
						)}
					</CardContent>

					<UploadDialog />
				</Card>
			</div>
		</div>
	);
};
