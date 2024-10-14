import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthProvider } from "./contexts/AuthContext";
import { InboxProvider } from "./contexts/InboxContext";
import { PotProvider } from "./contexts/PotContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(

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
);

// Register the service worker for PWA
serviceWorkerRegistration.register();
