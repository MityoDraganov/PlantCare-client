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
import { AdvancedSettingsComponent } from "../components/AdvancedSettingsComponent";
import { InfoTab } from "./tabs/InfoTab";
import { PotContext } from "../../../contexts/potContext";

export enum tabOptions {
	"info" = 0,
	"advancedSettings" = 1,
}

export const PotCard = (pot: CropPotResponseDto) => {
	const [tab, setTab] = useState<tabOptions>(tabOptions.info);
	const {setSelectedPot} = useContext(PotContext)

	const returnHandler = () => {
		setTab(tabOptions.info);
	};
	return (
		<Drawer key={pot.id}>
			<DrawerTrigger onClick={() => setSelectedPot(pot)}>
				<Card className="hover:bg-primary-foreground hover:cursor-pointer shadow-sm">
					<CardHeader>
						<CardTitle>{pot.alias}</CardTitle>
					</CardHeader>
				</Card>
			</DrawerTrigger>
			<DrawerContent
				className={`${
					tab !== tabOptions.info ? "min-h-[75dvh]" : "min-h-[40dvh]"
				} items-center text-left w-full`}
			>
				<DrawerHeader>
					<DrawerTitle>{pot.alias}</DrawerTitle>
				</DrawerHeader>
				{tab === tabOptions.info ? (
					<InfoTab pot={pot} setTab={setTab}/>
				) : (
					<AdvancedSettingsComponent
						returnHandler={returnHandler}
					/>
				)}
			</DrawerContent>
		</Drawer>
	);
};
