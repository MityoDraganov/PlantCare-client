import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Link } from "react-router-dom";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "../../../../components/ui/sheet";

export const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	return (
		<div className="md:h-full ">
			<div className="h-[94dvh] hidden md:block">
				{!isSidebarOpen ? (
					<div className="ml-2 pt-2 pr-1 h-full border-r">
						<PanelLeftOpen
							onClick={toggleSidebar}
							className="text-muted-foreground hover:text-black hover:cursor-pointer"
						/>
					</div>
				) : (
					<div className="z-10 w-[15dvw] h-full bg-white border-r shadow-sm">
						<PanelLeftClose
							onClick={toggleSidebar}
							className="mr-0 ml-auto text-muted-foreground hover:text-black hover:cursor-pointer mt-2 mr-2"
						/>
						<div className="flex flex-col h-full pb-10">
							<Link
								to={"/dashboard"}
								className="text-muted-foreground text-md font-medium hover:text-black p-2"
							>
								Dashboard
							</Link>
							<Link
								to={"/dashboard/pots"}
								className="text-muted-foreground text-md font-medium p-2 hover:text-green-700 hover:bg-green-200/50"
							>
								Crop Pots
							</Link>
						</div>
					</div>
				)}
			</div>

			<Sheet>
				<SheetTrigger className="mt-2 ml-2 md:hidden">
					<PanelLeftOpen
						onClick={toggleSidebar}
						className="text-muted-foreground hover:text-black hover:cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent side="left" className="px-0">
					<ul className="flex flex-col h-full pb-10">
						<Link
							to={"/dashboard"}
							className="text-black  text-lg font-medium p-2 pl-[10%] hover:text-green-700 hover:bg-green-200/50"
						>
							Dashboard
						</Link>
						<Link
							to={"/dashboard/pots"}
							className="text-black text-lg font-medium py-4 pl-[10%] hover:text-green-700 hover:bg-green-200/50"
						>
							Crop Pots
						</Link>
					</ul>
				</SheetContent>
			</Sheet>
		</div>
	);
};
