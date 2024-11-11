import { CropPotResponseDto } from "../../../dtos/cropPot.dto";
import { PotCard } from "../../../components/PotCards/PotCard/PotCard";
import { Card } from "../../../components/ui/card";
import { useTranslation } from "react-i18next";

export enum layoutOptions {
	page,
	component,
}

export const CropPots = ({
	cropPots,
	layout = layoutOptions.page,
	action,
}: {
	cropPots: CropPotResponseDto[] | null;
	layout?: layoutOptions;
	action?: Function;
}) => {
	const { t } = useTranslation();
	return (
		<Card className="h-[10%] sm:h-fit flex flex-col gap-2 py-4 px-2">
			{layout === layoutOptions.page && (
				<h2 className="text-xl pl-2 font-medium">{t("dashboard.cropPots")}:</h2>
			)}
			<ul className="h-full w-full flex flex-col sm:flex-row gap-2 md:gap-6 overflow-x-scroll">
				{cropPots?.length ? (
					// Repeat the map multiple times to create an overflow effect
					<>
					{
							cropPots.map((x: CropPotResponseDto, index: number) => (
								<li className="min-w-[40%] sm:min-w-[25%] md:min-w-[18%] ">
									<PotCard
										key={`${x.id}-${index}`} // Ensure unique keys for each PotCard
										pot={x}
										layout={layout}
										action={action}
									/>
								</li>
							))
}
					</>
				) : (
					<p>{t("dashboard.noPotsAvaliable")}</p>
				)}
			</ul>
		</Card>
	);
};
