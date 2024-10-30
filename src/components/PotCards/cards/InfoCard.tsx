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
}: InfoCardProps) => {
	return (
		<Card
			className={cn(
				`w-full h-full flex flex-col items-center gap-2 pt-2 ${
					!mainContent ? "py-10" : ""
				} ${asChild ? "border-none" : ""}`,
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
			{mainContent && (
				<CardContent className="flex flex-col h-fit justify-between items-center gap-0 font-mono">
					<span className="font-extrabold text-2xl">
						{mainContent}
					</span>
					<span className="uppercase text-xs">{subContent}</span>
				</CardContent>
			)}
			{isInDesignerMode && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="w-1/2 flex justify-center">
							<Select>
								<Tooltip></Tooltip>
								<SelectTrigger className="my-5 mx-5">
									<SelectValue placeholder="Select coresponding sensor" />
								</SelectTrigger>
								<SelectContent>
									{potSensors?.map((x) => (
										<SelectItem value="light">
											{x.alias}
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
