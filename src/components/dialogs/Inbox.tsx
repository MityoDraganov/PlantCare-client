import { Inbox as InboxIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { InboxContext } from "../../contexts/InboxContext";
import { useContext } from "react";

enum bodyEntries {
	title = "title",
	text = "text",
	action = "action"
}

export const Inbox = () => {
	const { messages } = useContext(InboxContext);
	// Recursive function to render values as key-value pairs
	const renderValue = (value: any) => {
		if (Array.isArray(value)) {
			return (
				<ul className="list-disc pl-5">
					{value.map((item, index) => (
						<li key={index}>{renderValue(item)}</li>
					))}
				</ul>
			);
		} else if (typeof value === "object" && value !== null) {
			return (
				<div className="pl-5">
					{Object.entries(value).map(([key, val]) => (
						<div key={key}>
							<span >{key}:</span>{" "}
							{renderValue(val)}
						</div>
					))}
				</div>
			);
		} else {
			return <span>{value.toString()}</span>; // For primitive values
		}
	};

	return (
		<Popover>
			<PopoverTrigger>
				<InboxIcon />
			</PopoverTrigger>

			<PopoverContent className="max-w-screen-sm max-h-96" align={"end"}>
				<h2 className="h-min">Inbox</h2>

				<div className="max-h-72 overflow-y-auto">
					{!messages || messages.length === 0 ? (
						<h2>No new notifications, yet!</h2>
					) : (
						<ul className="mt-2 flex flex-col gap-4">
							{messages.reverse().map((message, index) => {
								const date = new Date(message.timestamp);
								
								// Destructure data for easier access
								const { data } = message;
								const title = data[bodyEntries.title];
								
								return (
									<li
										key={index}
										className={`flex flex-col p-2 rounded-lg hover:bg-slate-50 ${!message.isRead ? "opacity-50" : ""}`}
									>
										{/* Notification Box */}
										<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-4 py-2">
											{/* Render title first if present */}
											{title && (
												<div className="font-bold">
													{renderValue(title)}
												</div>
											)}
											
											{/* Render other key-value pairs */}
											{Object.entries(data).map(([key, val], idx) => {
												// Skip rendering the title again
												if (key === bodyEntries.title) return null;

												// Handle text rendering
												if (key === bodyEntries.text) {
													return (
														<div key={idx}>
															{renderValue(val)}
														</div>
													);
												}

												// For everything else (with key-value and padding)
												return (
													<div key={idx} className="pl-5">
														<span className="font-semibold">
															{key}:
														</span>{" "}
														{renderValue(val)}
													</div>
												);
											})}
										</div>

										{/* Date Information */}
										<div className="flex w-full justify-between mt-2 text-sm text-gray-500">
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
													year: "2-digit",
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
