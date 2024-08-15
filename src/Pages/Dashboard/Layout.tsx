import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/SIdebar/Sidebar";

export const Layout = () => {
	return (
		<div className="flex">
			<Sidebar />
			<main className="h-fit p-4">
				<Outlet />
			</main>
		</div>
	);
};
