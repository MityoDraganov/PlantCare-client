import { Clerk } from "@clerk/clerk-js";
import toast from "react-hot-toast";
import { getTranslation } from "../lib/translation";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const handleScroll = (
    sectionId: string,
    closeMenu?: (value: boolean) => void
) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 64; // Height of the navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
    if (closeMenu) {
        closeMenu(false);
    }
};

export const refreshToken = async (): Promise<string | null> => {
    try {
        const clerk = new Clerk(PUBLISHABLE_KEY);
        await clerk.load();
        const session = clerk.session;
        if (session) {
            const newToken = await session.getToken();
			if (!newToken) {
				return null;
			}
			//toast.success(getTranslation("apiResponses.tokenRefreshed"));
            localStorage.setItem("clerkFetchedToken", newToken);
            return newToken;
        }
        return null;
    } catch (error) {
        console.error("Token refresh failed", error);
        return null;
    }
};