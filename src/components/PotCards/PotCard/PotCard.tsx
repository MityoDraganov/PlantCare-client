import { CropPotResponseDto } from "../../../dtos/CropPot.dto";
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
}: {
	pot: CropPotResponseDto;
	layout?: layoutOptions;
}) => {
	const sensorsWithoutDriver = pot.sensors.filter(
		(sensor) => !sensor.isDriverPresent
	);
	const [tab, setTab] = useState<tabOptions>(tabOptions.info);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { setSelectedPot } = useContext(PotContext);

	const onTriggerClick = () => {
		if (layout === layoutOptions.component) {
		} else {
			setIsOpen(true);
			setSelectedPot(pot);
		}
	};

	const returnHandler = () => {
		setTab(tabOptions.info);
	};
	return (
		<Drawer key={pot.id}>
			<DrawerTrigger onClick={onTriggerClick} asChild>
				<Card className="hover:bg-primary-foreground hover:cursor-pointer shadow-sm h-fit">
					<CardHeader>
						<CardTitle className="flex justify-between">
							{pot.alias}
							{sensorsWithoutDriver && (
								<TooltipProvider>
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
								</TooltipProvider>
							)}
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
