export interface LoadingContextType {
	isLoading: boolean;
	beginLoading: () => void;
	endLoading: () => void;
}