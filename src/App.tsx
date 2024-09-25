import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AddCropPot } from "./Pages/AddCropPot/AddCropPot";
import { HomePage } from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Layout } from "./Pages/Dashboard/Layout";
import { CropPots } from "./Pages/Dashboard/pages/CropPots";
import { PotProvider } from "./contexts/PotContext";
import { Suspense, useEffect } from "react";
import { Spinner } from "./components/spinner";
import useWebSocket from "./hooks/useSocket";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	const token = localStorage.getItem("clerkFetchedToken");
	console.log(token);
	
	const {messages, isConnected} = useWebSocket(`ws://localhost:8080/v1/users/?token=${token}`)
	useEffect(() => {
		console.log(messages)
		console.log(isConnected);
		
	}, [messages, isConnected])
	return (
		<ThemeProvider>
		<div className="h-screen w-screen">
			<Header messages={messages.slice(1)}/>
			<PotProvider>
				<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/cropPots/assign/:token"
						element={<AddCropPot />}
					/>

					<Route path="/dashboard" element={<Layout />}>
						<Route index element={<Dashboard />} />
						{/* <Route path="pots" element={<CropPots />} /> */}
					</Route>
				</Routes>
				</Suspense>
			</PotProvider>
			<Toaster />
		</div>
		</ThemeProvider>
	);
}

export default App;
