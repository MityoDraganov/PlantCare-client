import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import { LoadingContextType } from "../Interfaces/Loading.interface";

let globalLoadingControl: { endLoading: () => void; beginLoading: () => void } | null = null;
export const LoadingContext = createContext<LoadingContextType>({
	isLoading: false,
	beginLoading: () => {},
	endLoading: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);

	const beginLoading = useCallback(() => {
		setIsLoading(true);
	}, []);

	const endLoading = useCallback(() => {
		setIsLoading(false);
	}, []);

	globalLoadingControl = { endLoading, beginLoading };

	return (
		<LoadingContext.Provider
			value={{ isLoading, beginLoading, endLoading }}
		>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	return useContext(LoadingContext);
}


export const endLoadingWithoutHook = () => {
	if (globalLoadingControl) {
		globalLoadingControl.endLoading();
	} else {
		console.warn("Loading control is not available.");
	}
};