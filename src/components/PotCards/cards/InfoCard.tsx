import { ReactNode } from "react";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../ui/tooltip";
import { SensorDto } from "../../../dtos/sensors.dto";

export interface InfoCardProps {
	icon?: ReactNode;
	title?: string | ReactNode;
	mainContent?: ReactNode;
	subContent?: ReactNode;
	className?: string;
	asChild?: boolean;
	isInDesignerMode?: boolean;
	potSensors?: SensorDto[];
	cardType?: "structural" | "related";
}



export const InfoCard = ({
	icon,
	title,
	mainContent,
	subContent,
	className,
	asChild = false,
	isInDesignerMode = false,
	potSensors,
	cardType = "related",
}: InfoCardProps) => {

	const getIcon = () => icon || <span>Default Icon</span>;
	const getTitle = () => title || "Default Title";

	return (
		<Card
			className={cn(
				`w-full h-full flex flex-col items-center gap-2 pt-2 overflow-hidden ${
					!mainContent ? "py-10" : ""
				} ${asChild ? "border-none px-4" : ""}`,
				className
			)}
		>
			<CardTitle
				className={`text-sm flex items-center justify-center ${
					typeof title === "string" ? "gap-1" : "gap-4"
				}`}
			>
				{icon}
				{typeof title === "string" ? <p>{title}</p> : title}
			</CardTitle>
	
				<CardContent className="flex flex-col h-fit justify-between items-center gap-0 font-mono">
					<span className="font-extrabold text-2xl">
						{mainContent}
					</span>
					<span className="uppercase text-xs">{subContent}</span>
				</CardContent>
			
			{isInDesignerMode && cardType === "related" && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="w-1/2 flex justify-center absolute bottom-6">
							<Select>
								<Tooltip></Tooltip>
								<SelectTrigger className="my-5 mx-5">
									<SelectValue placeholder="Select coresponding sensor" />
								</SelectTrigger>
								<SelectContent>
									{potSensors?.map((x) => (
										<SelectItem value="light" key={x.id}>
											{x.alias ? x.alias : x.serialNumber}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</TooltipTrigger>
						<TooltipContent>
							<p>Select coresponding sensor</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</Card>
	);
};