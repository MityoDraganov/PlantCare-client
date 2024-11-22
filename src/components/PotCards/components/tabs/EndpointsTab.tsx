import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { TabsContent } from "../../../../components/ui/tabs";
import { useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { NewEndpoint } from "../breadCrumbs/NewEndpoint";
import { Endpoints } from "../breadCrumbs/Endpoints";
import { useTranslation } from "react-i18next";

enum tabOptions {
	"endpoints" = 0,
	"newEndpoint" = 1,
}

export const EndpointsTab = () => {
	const [tab, setTab] = useState<tabOptions>(tabOptions.endpoints);
	const { t } = useTranslation();
	return (
		<TabsContent value="endpoints" className="w-full h-full">
			<div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center py-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem
							onClick={() => setTab(tabOptions.endpoints)}
							className={`cursor-pointer hover:text-black ${
								tab === tabOptions.endpoints
									? "text-bold underline"
									: ""
							}`}
						>
							{t("advancedSettings.webhooks.endpoints")}
						</BreadcrumbItem>

						{tab === tabOptions.newEndpoint && (
							<>
								<BreadcrumbSeparator>
									<ChevronRight />
								</BreadcrumbSeparator>
								<BreadcrumbItem
									onClick={() => setTab(tabOptions.endpoints)}
									className={`cursor-pointer hover:text-black  ${
										tab === tabOptions.newEndpoint
											? "text-bold underline"
											: ""
									}`}
								>
									{t("advancedSettings.webhooks.newEndpoint")}
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>

				<Button
					variant="outline"
					className={`sm:ml-auto sm:mr-2 ml-0 mr-auto text-green-500 border-green-500 hover:bg-green-200/50 hover:text-green-800 hover:border-green-800 flex gap-3 transition-opacity duration-300 ${
						tab === tabOptions.newEndpoint
							? "opacity-0"
							: "opacity-100"
					}`}
					onClick={() => setTab(tabOptions.newEndpoint)}
				>
					<Plus />
					{t("advancedSettings.webhooks.addEndpoint")}
				</Button>
			</div>
			{tab === tabOptions.endpoints && <Endpoints />}

			{tab === tabOptions.newEndpoint && (
				<NewEndpoint returnTab={() => setTab(tabOptions.endpoints)} />
			)}
		</TabsContent>
	);
};
