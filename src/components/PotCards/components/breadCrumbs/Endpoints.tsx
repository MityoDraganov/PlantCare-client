import { useContext } from "react";
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
import { PotContext } from "../../../../contexts/potContext";

export const Endpoints = () => {
	const {selectedPot} = useContext(PotContext)
	return (
		<Table className="w-full h-full">
			<TableHeader className="w-full font-mono">
				<TableRow>
					<TableHead className=" w-max">URL</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{selectedPot?.webhooks?.length === 0 ? (
					<TableRow key="empty">
						<TableCell className="font-medium">
							No webhooks yet
						</TableCell>
					</TableRow>
				) : (
					selectedPot?.webhooks?.map(
						(webhook) =>
							webhook.id && (
								<Webhook webhook={webhook} key={webhook.id}/>
							)
					)
				)}
			</TableBody>
		</Table>
	);
};
