import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthProvider } from "./contexts/AuthContext";
import { InboxProvider } from "./contexts/InboxContext";
import { PotProvider } from "./contexts/PotContext";
import React from "react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
	<BrowserRouter>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<AuthProvider>
				<PotProvider>
					<InboxProvider>
						<App />
					</InboxProvider>
				</PotProvider>
			</AuthProvider>
		</ClerkProvider>
	</BrowserRouter>
	</React.StrictMode>
);

// Register the service worker for PWA
serviceWorkerRegistration.register();
