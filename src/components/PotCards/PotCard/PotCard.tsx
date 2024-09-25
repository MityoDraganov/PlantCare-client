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
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<TriangleAlert className="text-red-500 mr-0 ml-auto" />
									</TooltipTrigger>
									<TooltipContent>
										<p>Action required</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
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
					} items-center text-left w-full`}
				>
					<DrawerHeader className="flex gap-6 items-center">
						<DrawerTitle>{pot.alias}</DrawerTitle>

						<PotDialog pot={pot} />
					</DrawerHeader>
					{tab === tabOptions.info ? (
						<InfoTab pot={pot} setTab={setTab} />
					) : (
						<AdvancedSettingsComponent
							returnHandler={returnHandler}
						/>
					)}
				</DrawerContent>
			)}
		</Drawer>
	);
};
