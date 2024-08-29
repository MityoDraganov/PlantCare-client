import {
	createContext,
	FunctionComponent,
	ReactNode,
	useEffect,
	useState,
} from "react";
import { CropPotResponseDto } from "../dtos/CropPot.dto";
import { getAllPots } from "../api/requests";

export const PotContext = createContext<CropPotResponseDto[] | undefined>(
	undefined
);

interface PotProviderProps {
	children: ReactNode;
}
export const AuthProvider: FunctionComponent<PotProviderProps> = ({
	children,
}) => {
	const token = localStorage.getItem("clerkFetchedToken");
	const [cropPots, setCropPots] = useState<CropPotResponseDto[]>();

	useEffect(() => {
		(async () => {
			const response = await getAllPots();
			setCropPots(response);
		})();
	}, [token]);

	return (
		<PotContext.Provider value={cropPots}>{children}</PotContext.Provider>
	);
};
