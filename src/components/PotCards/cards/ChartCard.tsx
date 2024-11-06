import { ChartColumn } from "lucide-react";
import { InfoCard, InfoCardProps } from "./InfoCard";

export const ChartCard = ({ ...props }: InfoCardProps) => {
	return (
		<InfoCard
			className="hover:bg-primary-foreground hover:cursor-pointer"
			mainContent={
				<span className="flex flex-col justify-center items-center gap-1">
					<ChartColumn size={40} />
					<p className="text-sm text-center flex gap-0 items-center justify-center">
						<span className="w-fit">Measurements chart</span>
					</p>
				</span>
			}
			{...props}
            cardType="structural"
		/>
	);
};
