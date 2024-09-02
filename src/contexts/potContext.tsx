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
	selectedPot: CropPotResponseDto | null;
	setSelectedPot: Dispatch<SetStateAction<CropPotResponseDto | null>>;
}

export const PotContext = createContext<PotContextType>({
	cropPots: null,
	setCropPots: () => null,
	selectedPot: null,
	setSelectedPot: () => null,
});

interface PotProviderProps {
	children: ReactNode;
}

export const PotProvider: FunctionComponent<PotProviderProps> = ({
	children,
}) => {
	const token = localStorage.getItem("clerkFetchedToken");
	const [cropPots, setCropPots] = useState<CropPotResponseDto[] | null>(null);

	const [selectedPot, setSelectedPot] = useState<CropPotResponseDto | null>(
		null
	);

	useEffect(() => {
		(async () => {
			const response = await getAllPots();
			setCropPots(response);
		})();
	}, [token]);

	useEffect(() => {
		if (cropPots && selectedPot) {
			// Find the updated version of the selected pot
			const updatedSelectedPot = cropPots.find(pot => pot.id === selectedPot.id);

			// Only update if there's an actual change
			if (updatedSelectedPot && updatedSelectedPot !== selectedPot) {
				setSelectedPot(updatedSelectedPot);
			}
		}
	}, [cropPots, selectedPot]);

	return (
		<PotContext.Provider
			value={{ cropPots, setCropPots, selectedPot, setSelectedPot }}
		>
			{children}
		</PotContext.Provider>
	);
};
