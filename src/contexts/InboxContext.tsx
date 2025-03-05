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
	AddMessage: (message: Message) => void;
	handleMarkAllMessagesAsRead: () => void;
}

export const InboxContext = createContext<InboxContextType>({
	messages: [],
	setMessages: () => {},
	AddMessage: () => {},
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

	const AddMessage = (message: Message) => {
		messages.push(message);
		setMessages([...messages]);
	}
	return (
		<InboxContext.Provider value={{ messages, setMessages, AddMessage,  handleMarkAllMessagesAsRead }}>
			{children}
		</InboxContext.Provider>	
	);
};
