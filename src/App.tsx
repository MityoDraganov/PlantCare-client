// App.js
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddCropPot } from "./Pages/AddCropPot/AddCropPot";
import { HomePage } from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Layout } from "./Pages/Dashboard/Layout";
import { Suspense } from "react";
import { Spinner } from "./components/spinner";
import useWebSocket from "./hooks/useSocket";
import { ThemeProvider } from "./components/theme-provider";
import { Footer } from "./components/Footer"; // Import the Footer
import { Marketplace } from "./Pages/Marketplace/Marketplace";

function App() {
	const token = localStorage.getItem("clerkFetchedToken");
	useWebSocket(`ws://localhost:8080/v1/users/?token=${token}`);

	return (
		<ThemeProvider>
			<div className="flex flex-col h-screen w-screen">
				<Header />

				<Suspense fallback={<Spinner />}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/cropPots/assign/:token"
							element={<AddCropPot />}
						/>
						<Route path="/dashboard" element={<Layout />}>
							<Route index element={<Dashboard />} />
							
						</Route>

						<Route path="/marketplace" element={<Marketplace />} />
					</Routes>
				</Suspense>

				<Toaster />
				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
