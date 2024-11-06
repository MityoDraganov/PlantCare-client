import { CropPotResponseDto, SensorStatus } from "../../../dtos/CropPot.dto";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../../ui/drawer";
import { useContext, useState } from "react";
import { AdvancedSettingsComponent } from "./tabs/AdvancedSettingsComponent";
import { InfoTab } from "./tabs/InfoTab";
import { PotContext } from "../../../contexts/PotContext";
import { PotDialog } from "../../dialogs/potDialog";
import { layoutOptions } from "../../../Pages/Dashboard/pages/CropPots";
import { TriangleAlert } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../ui/tooltip";

export enum tabOptions {
	"info" = 0,
	"advancedSettings" = 1,
}

export const PotCard = ({
	pot,
	layout = layoutOptions.page,
	action,
}: {
	pot: CropPotResponseDto;
	layout?: layoutOptions;
	action?: Function;
}) => {
	const sensorsWithoutDriver = pot.sensors.filter(
		(sensor) => !sensor.driverUrl
	);
	const [tab, setTab] = useState<tabOptions>(tabOptions.info);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { setSelectedPot } = useContext(PotContext);

	const onTriggerClick = () => {
		if (layout === layoutOptions.component) {
			if (action) action(pot.id);
		} else {
			setIsOpen(true);
			setSelectedPot(pot);
		}
	};

	const returnHandler = () => {
		setTab(tabOptions.info);
	};

	const renderStatusDot = (status: SensorStatus) => {
		const colorClass = {
			[SensorStatus.Online]: "bg-green-500",
			[SensorStatus.Updating]: "bg-yellow-500",
			[SensorStatus.Offline]: "bg-red-500",
		}[status];

		return <span className={`h-2 w-2 rounded-full ${colorClass}`} />;
	};

	return (
		<Drawer key={pot.id}>
			<DrawerTrigger onClick={onTriggerClick} asChild>
				<Card className="hover:bg-primary-foreground hover:cursor-pointer shadow-sm h-full">
					<CardHeader className="h-fit w-full">
						<CardTitle className="flex w-full h-full justify-between items-center">
							<p>{pot.alias}</p>
							<div className="ml-2 flex gap-2">
								<TooltipProvider>
									{sensorsWithoutDriver.length > 0 && (
										<Tooltip>
											<TooltipTrigger>
												<TriangleAlert className="text-red-500 mr-0 ml-auto" />
											</TooltipTrigger>
											<TooltipContent>
												<p>Action required</p>
												<span className="text-sm font-normal">
													{" "}
													- provide a driver
												</span>
											</TooltipContent>
										</Tooltip>
									)}
									<Tooltip>
										<TooltipTrigger>
											<div className="flex items-center">
												{renderStatusDot(pot.status)}
											</div>
										</TooltipTrigger>
										<TooltipContent>
											Pot status: {pot.status}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</CardTitle>
					</CardHeader>
				</Card>
			</DrawerTrigger>
			{isOpen && (
				<DrawerContent
					className={`${
						tab !== tabOptions.info
							? "min-h-[75dvh]"
							: "min-h-[40dvh]"
					} max-h-full items-center text-left w-full`}
				>
					<DrawerHeader className="flex gap-6 items-center">
						<DrawerTitle>{pot.alias}</DrawerTitle>

						<PotDialog pot={pot} />
					</DrawerHeader>
					<div className="w-full h-full overflow-auto flex flex-col items-center">
						{tab === tabOptions.info ? (
							<InfoTab pot={pot} setTab={setTab} />
						) : (
							<AdvancedSettingsComponent
								returnHandler={returnHandler}
							/>
						)}
					</div>
				</DrawerContent>
			)}
		</Drawer>
	);
};
