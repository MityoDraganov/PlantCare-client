import { Inbox as InboxIcon } from "lucide-react";
import { Message } from "../../Interfaces/websocket.interface";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Inbox = ({ messages }: { messages: Message[] }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<InboxIcon />
			</PopoverTrigger>

			{/* Remove overflow-hidden from PopoverContent */}
			<PopoverContent
				className="max-w-screen-sm max-h-96"
				align={"end"}
			>
				<h2 className="h-min">Inbox</h2>

				{/* Add overflow-y-auto and max-h to the div that contains the list */}
				<div className="max-h-72 overflow-y-auto">
					{messages.length === 0 ? (
						<h2>No new notifications, yet!</h2>
					) : (
						<ul className="mt-2 flex flex-col gap-4">
							{messages.map((x, index) => {
								const date = new Date(x.timestamp);

								return (
									<li key={index} className="flex flex-col p-2 rounded-lg hover:bg-slate-50">
										<span className="rounded-lg border bg-card text-card-foreground shadow-sm px-4 py-2">
											{x?.data?.Message}
										</span>
										<div className="flex w-full justify-between">
											<span>
												{date.toLocaleString("en-US", {
													weekday: "long",
													hour: "numeric",
													minute: "numeric",
													hour12: true,
												})}
											</span>
											<span>
												{date.toLocaleString("en-US", {
													month: "short",
													day: "2-digit",
													year:"2-digit"
												})}
											</span>
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};
