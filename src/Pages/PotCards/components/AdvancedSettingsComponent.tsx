import { ArrowLeft } from "lucide-react";
import { WebhookSettings } from "./WebhookSettings";
import { CropPotResponseDto } from "../../../dtos/CropPot.dto";


export const AdvancedSettingsComponent = ({
	returnHandler,
	potData
}: {
	returnHandler: () => void;
	potData: CropPotResponseDto;
}) => {

	return (
		<div className="w-2/3 ">
			<ArrowLeft
				className="absolute top-[2dvh] left-[2dvh] hover:cursor-pointer"
				onClick={returnHandler}
				size={28}
			/>

			<WebhookSettings potData={potData}/>
		</div>
	);
};
