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

export const Marketplace = () => {
	const [drivers, setDrivers] = useState<DriverDto[]>();

	useEffect(() => {
		(async () => {
			setDrivers(await getAllDrivers());
		})();
	}, []);

	console.log(drivers);

	return (
		<div className="flex flex-col w-full h-full p-4 gap-4 items-center relative">
			<header className="text-center">
				<h1 className="text-2xl">
					PlantsCare -{" "}
					<span className="font-medium">Marketplace</span>
				</h1>
				<p>Find all your drivers in one place</p>
			</header>

			<Card className="w-full h-full relative px-3 py-2 flex flex-col gap-2">
				<Select>
					<SelectTrigger
						className="w-[10%] mr-0 ml-auto"
						icon={Filter}
					>
						<SelectValue placeholder="Sort by:" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="official">Official</SelectItem>
						<SelectItem value="mostPopular">
							Most popular
						</SelectItem>
						<SelectItem value="mostPopular">
							Least popular
						</SelectItem>
					</SelectContent>
				</Select>
				<CardContent className="flex gap-3 flex-wrap p-0">
					{drivers ? (
						drivers?.map((x) => (
							<MarketplaceCard key={x.id} {...x} />
						))
					) : (
						<p>No drivers found!</p>
					)}
				</CardContent>
				<UploadDialog />
			</Card>
		</div>
	);
};
