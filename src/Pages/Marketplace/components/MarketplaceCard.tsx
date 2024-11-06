import { BadgeCheck, Github } from "lucide-react";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { DriverDto } from "../../../dtos/driver.dto";
import { UploadDialog } from "./UploadDialog";

export const MarketplaceCard = ({
	driverDto,
	asChild,
	handleUpdateSensor,
	sensorId,
}: {
	driverDto: DriverDto;
	asChild?: boolean;
	handleUpdateSensor?: (sensorId: number, newValue: string) => void;
	sensorId?: number;
}) => {
	const displayName = driverDto.user.username || driverDto.user.email;
	return (
		<Card className="w-full sm:w-[48%] md:w-[24%] lg:w-[16%] h-[60%] flex flex-col justify-between ">
			<CardTitle className="text-sm flex flex-col p-2 h-[50%] md:h-auto">
				<div className=" w-[95%] h-full aspect-square mx-auto">
					<img
						className="w-full h-full object-cover border rounded-lg"
						src={driverDto.marketplaceBannerUrl}
					/>
				</div>
				<p className="pl-2 font-medium mt-2">{driverDto.alias}</p>
			</CardTitle>
			<CardContent className="p-2 text-left w-full flex flex-col">
				<div className="flex justify-between items-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<BadgeCheck className="text-blue-400" />
							</TooltipTrigger>
							<TooltipContent>
								Official and trusted sensor
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{driverDto.isUploader ? (
						<UploadDialog
							initialData={{
								alias: driverDto.alias,
								downloadUrl: driverDto.downloadUrl,
								marketplaceBanner: null,
							}}
							driverId={driverDto.id}
						/>
					) : asChild && sensorId && handleUpdateSensor ? (
						<Button
							className="flex gap-2 mr-0 ml-auto text-sm"
							size="sm"
							onClick={() =>
								handleUpdateSensor(
									sensorId,
									driverDto.downloadUrl
								)
							}
						>
							Select
						</Button>
					) : (
						<Link to={driverDto.downloadUrl}>
							<Button
								className="flex gap-2 mr-0 ml-auto text-sm"
								size="sm"
							>
								Visit <Github />
							</Button>
						</Link>
					)}
				</div>
				<p className="text-xs">
					<span className="font-medium">Made by:</span>{" "}
					{driverDto.isUploader ? (
						<span className="uppercase font-bold">you</span>
					) : (
						<span>{displayName}</span>
					)}
				</p>
			</CardContent>
		</Card>
	);
};
