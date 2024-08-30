import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { CropPotResponseDto } from "../dtos/CropPot.dto";
import { getAllPots } from "../api/requests";

interface PotContextType {
	cropPots: CropPotResponseDto[] | null;
	setCropPots: Dispatch<SetStateAction<CropPotResponseDto[] | null>>;
}

// Set the default value with null for both cropPots and setCropPots
export const PotContext = createContext<PotContextType>({
	cropPots: null,
	setCropPots: () => null, // Default no-op function
});

interface PotProviderProps {
	children: ReactNode;
}

export const PotProvider: FunctionComponent<PotProviderProps> = ({
	children,
}) => {
	const token = localStorage.getItem("clerkFetchedToken");
	const [cropPots, setCropPots] = useState<CropPotResponseDto[] | null>(null);

	useEffect(() => {
		(async () => {
			const response = await getAllPots();
			setCropPots(response);
		})();
	}, [token]);

	return (
		<PotContext.Provider value={{ cropPots, setCropPots }}>
			{children}
		</PotContext.Provider>
	);
};
