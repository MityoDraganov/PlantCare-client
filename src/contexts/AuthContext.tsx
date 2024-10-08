import {
    createContext,
    FunctionComponent,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "../components/spinner";

interface AuthContextProps {
    token: string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
    children,
}) => {
    const { getToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            if (fetchedToken) {
                setToken(fetchedToken);
                localStorage.setItem("clerkFetchedToken", fetchedToken);
            }
        };

        fetchToken();
    }, [getToken]);

    // Optionally, you can show a loading state while the token is being fetched
    if (token === null && window.location.pathname !== "/") {
        return <Spinner />;
    }

    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    );
};
