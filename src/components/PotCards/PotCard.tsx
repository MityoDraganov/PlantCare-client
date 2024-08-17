import { Settings } from "lucide-react";
import { CropPotResponseDto } from "../../dtos/CropPot.dto";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Chart } from "./cards/Chart";

export const PotCard = (pot: CropPotResponseDto) => {
	return (
		<Drawer>
			<DrawerTrigger>
				<Card className="hover:bg-primary-foreground hover:cursor-pointer shadow-sm">
					<CardHeader>
						<CardTitle>{pot.alias}</CardTitle>
					</CardHeader>
				</Card>
			</DrawerTrigger>
			<DrawerContent className="min-h-[40dvh] items-center text-left">
				<DrawerHeader>
					<DrawerTitle>{pot.alias}</DrawerTitle>
				</DrawerHeader>
				<div className="grid grid-cols-1 h-[90%] md:grid-cols-2 gap-2">
					<div className="md:border-r h-full md:border-gray-300 pr-6">
						<p className="flex flex-col">
							<span className="font-semibold">Last watered:</span>{" "}
							<span className="text-muted-foreground">
								{new Date(pot.lastWateredAt).toUTCString()}
							</span>
						</p>

						<div className="h-max">
							<Chart sensorData={pot.sensorData} />
						</div>
					</div>
					<div className="pl-3 flex flex-col justify-between h-full pb-5">
						<div className="flex flex-col gap-[2%]">
							<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2">
								{" "}
								<Settings />
								Settings
							</h2>
							<ul>
								{Object.keys(pot.controlSettings).map((x) => (
									<li className="flex items-center gap-2">
										<span>
											{x.split(/(?=[A-Z])/).join(" ")}:
										</span>{" "}
										<Input
											className="h-fit py-1 pr-0 w-1/3 text-center"
											type="number"
											value={
												pot.controlSettings[
													x as keyof typeof pot.controlSettings
												]
											}
										/>
									</li>
								))}
							</ul>
						</div>

						<p className="text-sm hover:underline hover:text-black text-muted-foreground transition-all duration-100">
							Advanced Settings
						</p>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
