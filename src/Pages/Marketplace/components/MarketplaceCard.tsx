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

export const MarketplaceCard = (driverDto: DriverDto) => {
	return (
		<Card className="w-[16%]">
			<CardTitle className="text-sm flex flex-col p-2">
				<img
					className="border rounded-lg w-[95%] mx-auto"
					src={driverDto.marketplaceBannerUrl}
				/>
				<p className="pl-2 font-medium">Temperature sensor driver</p>
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

					<Link to={driverDto.downloadUrl}>
						<Button
							className="flex gap-2 mr-0 ml-auto text-sm"
							size="sm"
						>
							Visit <Github />
						</Button>
					</Link>
				</div>
                <p className="text-xs">Made by:</p>
			</CardContent>
		</Card>
	);
};
