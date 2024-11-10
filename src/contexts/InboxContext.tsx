import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { Message } from "../Interfaces/websocket.interface";

interface InboxContextType {
	messages: Message[];
	setMessages: Dispatch<SetStateAction<Message[]>>;
	handleMarkAllMessagesAsRead: () => void;
}

export const InboxContext = createContext<InboxContextType>({
	messages: [],
	setMessages: () => {},
	handleMarkAllMessagesAsRead: () => {},
});

interface InboxProviderProps {
	children: ReactNode;
}

export const InboxProvider: FunctionComponent<InboxProviderProps> = ({
	children,
}) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const handleMarkAllMessagesAsRead = () => {
		setMessages((prevMessages) =>
			prevMessages.map((message) => ({ ...message, isRead: true }))
		);
	};
	return (
		<InboxContext.Provider value={{ messages, setMessages, handleMarkAllMessagesAsRead }}>
			{children}
		</InboxContext.Provider>	
	);
};
