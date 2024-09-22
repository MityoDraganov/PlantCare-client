import { Inbox as InboxIcon } from "lucide-react";
import { Message } from "../../Interfaces/websocket.interface";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Inbox = ({ messages }: { messages: Message[] }) => {
    console.log(messages);

    // Recursive function to render values
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
                            <span className="font-semibold">{key}:</span>{" "}
                            {renderValue(val)}
                        </div>
                    ))}
                </div>
            );
        } else {
            return <span>{value}</span>; // For primitive values
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
                    {messages.length === 0 ? (
                        <h2>No new notifications, yet!</h2>
                    ) : (
                        <ul className="mt-2 flex flex-col gap-4">
                            {messages.map((x, index) => {
                                const date = new Date(x.timestamp);
                                const messageContent = x.data.Message;

                                return (
                                    <li
                                        key={index}
                                        className="flex flex-col p-2 rounded-lg hover:bg-slate-50"
                                    >
                                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-4 py-2">
                                            {typeof messageContent === "string" ? (
                                                messageContent
                                            ) : (
                                                <ul className="list-disc pl-5">
                                                    {messageContent.map(
                                                        (item: any, itemIndex: number) => (
                                                            <li key={itemIndex}>
                                                                <p>
                                                                    <span className="font-semibold">
                                                                        Event:
                                                                    </span>{" "}
                                                                    {x.event}
                                                                </p>
                                                                {renderValue(item)}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
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
