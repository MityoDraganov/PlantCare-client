import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";

interface InboxContextType {
	messages: any[];
	setMessages: Dispatch<SetStateAction<any[]>>;
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

	useEffect(() => {
		console.log(messages);
		
	}, [])
	return (
		<InboxContext.Provider value={{ messages, setMessages }}>
			{children}
		</InboxContext.Provider>	
	);
};
