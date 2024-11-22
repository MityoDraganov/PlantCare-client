import { useContext } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../components/ui/table";

import { Webhook } from "../Webhook";
import { PotContext } from "../../../../contexts/PotContext";
import { useTranslation } from "react-i18next";

export const Endpoints = () => {
	const { selectedPot } = useContext(PotContext);
	const { t } = useTranslation();
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
							{t("advancedSettings.webhooks.noWebhooksYet")}
						</TableCell>
					</TableRow>
				) : (
					selectedPot?.webhooks?.map(
						(webhook) =>
							webhook.id && (
								<Webhook webhook={webhook} key={webhook.id} />
							)
					)
				)}
			</TableBody>
		</Table>
	);
};
