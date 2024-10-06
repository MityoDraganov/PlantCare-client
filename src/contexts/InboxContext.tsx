import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { Message } from "../Interfaces/websocket.interface";

interface InboxContextType {
	messages: Message[];
	setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const InboxContext = createContext<InboxContextType>({
	messages: [],
	setMessages: () => {},
});

interface InboxProviderProps {
	children: ReactNode;
}

export const InboxProvider: FunctionComponent<InboxProviderProps> = ({
	children,
}) => {
	const [messages, setMessages] = useState<any[]>([]);
	return (
		<InboxContext.Provider value={{ messages, setMessages }}>
			{children}
		</InboxContext.Provider>	
	);
};
