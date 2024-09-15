import { ArrowLeft } from "lucide-react";
import { WebhookSettings } from "../../components/WebhookSettings";


export const AdvancedSettingsComponent = ({
	returnHandler,
}: {
	returnHandler: () => void;
}) => {

	return (
		<div className="w-[95%]">
			<ArrowLeft
				className="absolute top-[2dvh] left-[2dvh] hover:cursor-pointer"
				onClick={returnHandler}
				size={28}
			/>

			<WebhookSettings/>
		</div>
	);
};
