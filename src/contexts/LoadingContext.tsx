import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";

interface LoadingContextType {
	isLoading: boolean;
	beginLoading: () => void;
	endLoading: () => void;
}

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
