import { Inbox as InboxIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
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

			<DialogContent className="w-3/5">
				<DialogHeader>
					<DialogTitle>Inbox</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
