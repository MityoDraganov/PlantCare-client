import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AddCropPot } from "./Pages/AddCropPot/AddCropPot";
import { HomePage } from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import {Layout} from "./Pages/Dashboard/Layout";
import { CropPots } from "./Pages/Dashboard/pages/CropPots";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/cropPots/assign/:token"
					element={<AddCropPot />}
				/>

				<Route path="/dashboard" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="pots" element={<CropPots />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
