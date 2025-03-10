import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { CropPotResponseDto } from "../dtos/cropPot.dto";
import { getAllPots } from "../api/requests";
import { AuthContext } from "./AuthContext";

interface PotContextType {
	cropPots: CropPotResponseDto[] | null;
	setCropPots: Dispatch<SetStateAction<CropPotResponseDto[] | null>>;
	selectedPot: CropPotResponseDto | null;
	setSelectedPot: Dispatch<SetStateAction<CropPotResponseDto | null>>;
	updatePotDataHandler: (updatedPotData: CropPotResponseDto) => void;
}

export const PotContext = createContext<PotContextType>({
	cropPots: null,
	setCropPots: () => null,
	selectedPot: null,
	setSelectedPot: () => null,
	updatePotDataHandler: () => null,
});

interface PotProviderProps {
	children: ReactNode;
}
// In PotProvider (inside PotContext.tsx)
export const PotProvider: FunctionComponent<PotProviderProps> = ({
	children,
}) => {
	const authContext = useContext(AuthContext);
	const token = authContext?.token; // Use optional chaining to safely access token

	const [cropPots, setCropPots] = useState<CropPotResponseDto[] | null>(null);
	const [selectedPot, setSelectedPot] = useState<CropPotResponseDto | null>(
		null
	);

	useEffect(() => {
		(async () => {
			if (token) {
				// Ensure token exists before making API calls
				const response = await getAllPots();
				setCropPots(response);
			}
		})();
	}, [token]);

	useEffect(() => {
		if (cropPots && selectedPot) {
			// Find the updated version of the selected pot
			const updatedSelectedPot = cropPots.find(
				(pot) => pot.id === selectedPot.id
			);

			// Only update if there's an actual change
			if (updatedSelectedPot && updatedSelectedPot !== selectedPot) {
				setSelectedPot(updatedSelectedPot);
			}
		}
	}, [cropPots, selectedPot]);

	const updatePotDataHandler = (updatedPotData: CropPotResponseDto) => {
		if (!cropPots) {
			return;
		}
	
		// Use findIndex to find the pot by its id
		const updatedPotIndex = cropPots.findIndex((pot) => pot.id === updatedPotData.id);
		
		if (updatedPotIndex !== -1) {
			const updatedCropPots = [...cropPots];
			updatedCropPots[updatedPotIndex] = {
				...updatedCropPots[updatedPotIndex],
				...updatedPotData,
			};
	
			setCropPots(updatedCropPots);
	
			if (selectedPot?.id === updatedPotData.id) {
				setSelectedPot({
					...selectedPot,
					...updatedPotData,
				});
			}
		}
	};
	
	return (
		<PotContext.Provider
			value={{
				cropPots,
				setCropPots,
				selectedPot,
				setSelectedPot,
				updatePotDataHandler,
			}}
		>
			{children}
		</PotContext.Provider>
	);
};
