

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthProvider } from "./contexts/AuthContext";
import { InboxProvider } from "./contexts/InboxContext";
import { PotProvider } from "./contexts/PotContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { enUS, bgBG } from "@clerk/localizations";
import "./lib/translation";
import { useTranslation } from "react-i18next";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

type SupportedLanguages = "en" | "bg";

const localizationMap: Record<SupportedLanguages, typeof enUS> = {
	en: enUS,
	bg: bgBG,
};

const Main = () => {
	const { i18n } = useTranslation();
	const currentLanguage = i18n.language;

	return (
		<BrowserRouter>
			<ClerkProvider
				publishableKey={PUBLISHABLE_KEY}
				afterSignOutUrl="/"
				localization={
					localizationMap[currentLanguage as SupportedLanguages]
				}
			>
				<AuthProvider>
					<PotProvider>
						<InboxProvider>
							<LoadingProvider>
								<App />
							</LoadingProvider>
						</InboxProvider>
					</PotProvider>
				</AuthProvider>
			</ClerkProvider>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);

// Register the service worker for PWA
serviceWorkerRegistration.register();
