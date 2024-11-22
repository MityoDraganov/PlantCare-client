
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { EndpointsTab } from "./tabs/EndpointsTab";
import { EventCatalogTab } from "./tabs/EventCatalogTab";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { useTranslation } from "react-i18next";


export const WebhookSettings = () => {
	const { t } = useTranslation();
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{t('advancedSettings.webhooks.webhooks')}</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<Tabs
					defaultValue="endpoints"
					className="w-full flex flex-col gap-2"
				>
					<TabsList className="w-full">
						<TabsTrigger value="endpoints" className="flex-1">
						{t('advancedSettings.webhooks.endpoints')}
						</TabsTrigger>
						<TabsTrigger value="eventCatalog" className="flex-1" disabled>
						{t('advancedSettings.webhooks.eventCatalog')}
						</TabsTrigger>
					</TabsList>
					<EndpointsTab/>
					<EventCatalogTab />
				</Tabs>
			</CardContent>
		</Card>
	);
};
