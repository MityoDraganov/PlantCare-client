import { Inbox as InboxIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const Inbox = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<InboxIcon />
			</DialogTrigger>

			<DialogContent className="w-11/12 md:w-[30%] h-2/3">
				<DialogHeader className="h-min">
					<DialogTitle>Inbox</DialogTitle>
				</DialogHeader>
		
					<div className="h-full">
						<h2>No new notifications, yet!</h2>
					</div>

			</DialogContent>
		</Dialog>
	);
};
