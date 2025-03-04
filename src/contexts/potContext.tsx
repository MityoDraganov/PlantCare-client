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

import { getAllPots } from "../api/requests";
import { AuthContext } from "./AuthContext";
import { CropPotResponseDto, SensorMeasurementUpdateDto } from "../dtos/CropPot.dto";

interface PotContextType {
	cropPots: CropPotResponseDto[] | null;
	setCropPots: Dispatch<SetStateAction<CropPotResponseDto[] | null>>;
	selectedPot: CropPotResponseDto | null;
	setSelectedPot: Dispatch<SetStateAction<CropPotResponseDto | null>>;
	updatePotDataHandler: (updatedPotData: CropPotResponseDto) => void;
	updatePotMeasurements: (updatedPotData: SensorMeasurementUpdateDto) => void;
}

export const PotContext = createContext<PotContextType>({
	cropPots: null,
	setCropPots: () => null,
	selectedPot: null,
	setSelectedPot: () => null,
	updatePotDataHandler: () => null,
	updatePotMeasurements: () => null,
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
		const updatedPotIndex = cropPots.findIndex(
			(pot) => pot.id === updatedPotData.id
		);

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

	const updatePotMeasurements = (updatedPotData: SensorMeasurementUpdateDto) => {
		if (!cropPots) {
			return;
		}
	
		// Find the pot that contains the sensor with the given sensorId
		const updatedPotIndex = cropPots.findIndex((pot) =>
			pot.sensors.some((sensor) => sensor.id === updatedPotData.sensorId)
		);
	
		if (updatedPotIndex !== -1) {
			// Find the pot
			const updatedCropPots = [...cropPots];
			const potToUpdate = updatedCropPots[updatedPotIndex];
	
			// Find the specific sensor within the pot
			const updatedSensors = potToUpdate.sensors.map((sensor) => {
				if (sensor.id === updatedPotData.sensorId) {
					return {
						...sensor,
						measurements: [
							...sensor.measurements,
							{
								value: updatedPotData.value,
								CreatedAt: new Date().toISOString(),
								sensorSerialNumber: sensor.serialNumber,
								sensorId: updatedPotData.sensorId,
							},
						],
					};
				}
				return sensor;
			});
	
			// Update the pot with the new sensor data
			updatedCropPots[updatedPotIndex] = {
				...potToUpdate,
				sensors: updatedSensors,
			};
	
			// Set the new cropPots state
			setCropPots(updatedCropPots);
	
			// If the selected pot is the one being updated, update it as well
			if (selectedPot?.id === potToUpdate.id) {
				setSelectedPot({
					...selectedPot,
					sensors: updatedSensors,
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
				updatePotMeasurements,
			}}
		>
			{children}
		</PotContext.Provider>
	);
};
