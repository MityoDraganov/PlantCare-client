import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/SIdebar/Sidebar";

export const Layout = () => {
	return (
		<div className="flex flex-col md:flex-row">
			<Sidebar />
			
				<Outlet />
		
		</div>
	);
};