import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { WebhookSettings } from "./WebhookSettings";


export const AdvancedSettingsComponent = ({
	returnHandler,
}: {
	returnHandler: () => void;
}) => {

	return (
		<div className="w-2/3 ">
			<ArrowLeft
				className="absolute top-[2dvh] left-[2dvh] hover:cursor-pointer"
				onClick={returnHandler}
				size={28}
			/>

			<Card className="w-full">
				<CardHeader>
					<CardTitle>Webhooks</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="endpoints" className="w-full flex flex-col gap-2">
						<TabsList className="w-full">
							<TabsTrigger value="endpoints" className="flex-1">
								Endpoints
							</TabsTrigger>
							<TabsTrigger value="eventCatalog" className="flex-1">
								Event Catalog
							</TabsTrigger>
						</TabsList>
                        <WebhookSettings />
						<TabsContent value="eventCatalog">
							Change your password here.
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};
