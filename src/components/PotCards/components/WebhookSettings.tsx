
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { EndpointsTab } from "./tabs/EndpointsTab";
import { EventCatalogTab } from "./tabs/EventCatalogTab";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";


export const WebhookSettings = () => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Webhooks</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<Tabs
					defaultValue="endpoints"
					className="w-full flex flex-col gap-2"
				>
					<TabsList className="w-full">
						<TabsTrigger value="endpoints" className="flex-1">
							Endpoints
						</TabsTrigger>
						<TabsTrigger value="eventCatalog" className="flex-1" disabled>
							Event Catalog (coming soon)
						</TabsTrigger>
					</TabsList>
					<EndpointsTab/>
					<EventCatalogTab />
				</Tabs>
			</CardContent>
		</Card>
	);
};
