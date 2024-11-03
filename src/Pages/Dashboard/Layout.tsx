import { Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<div className="flex flex-col md:flex-row h-full overflow-x-hidden pb-14">
			<Outlet />
		</div>
	);
};
