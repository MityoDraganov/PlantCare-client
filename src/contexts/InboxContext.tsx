import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
//import { CropInboxResponseDto } from "../dtos/CropInbox.dto";

interface InboxContextType {
	//cropInboxs: CropInboxResponseDto[] | null;
}

export const InboxContext = createContext<InboxContextType>({
	cropInboxs: null,
});

interface InboxProviderProps {
	children: ReactNode;
}

export const InboxProvider: FunctionComponent<InboxProviderProps> = ({
	children,
}) => {





	return (
		<InboxContext.Provider
			value={{ cropInboxs, setCropInboxs, selectedInbox, setSelectedInbox }}
		>
			{children}
		</InboxContext.Provider>
	);
};
