import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../components/ui/table";
import { CropPotResponseDto } from "../../../../dtos/CropPot.dto";

import { Webhook } from "../Webhook";

export const Endpoints = ({ potData }: { potData: CropPotResponseDto }) => {
	return (
		<Table className="w-full h-full">
			<TableHeader className="w-full font-mono">
				<TableRow>
					<TableHead className=" w-max">URL</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{potData.webhooks?.length === 0 ? (
					<TableRow key="empty">
						<TableCell className="font-medium">
							No webhooks yet
						</TableCell>
					</TableRow>
				) : (
					potData.webhooks?.map(
						(webhook) =>
							webhook.id && (
								<Webhook potData={potData} webhook={webhook} />
							)
					)
				)}
			</TableBody>
		</Table>
	);
};
