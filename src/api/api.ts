import toast from "react-hot-toast";
import { getTranslation } from "../lib/translation";
import { Clerk } from "@clerk/clerk-js";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const host =
	process.env.NODE_ENV === "production" ? "" : "//localhost:8080/api/v1/";

interface RequestOptions {
	method: string;
	headers: {
		"content-type"?: string;
		Authorization?: string;
	};
	body?: string | FormData;
}

const refreshToken = async (): Promise<string | null> => {
    try {
        const clerk = new Clerk(PUBLISHABLE_KEY);
        await clerk.load();
        const session = clerk.session;
        if (session) {
            const newToken = await session.getToken();
			if (!newToken) {
				return null;
			}
			toast.success(getTranslation("apiResponses.tokenRefreshed"));
            localStorage.setItem("clerkFetchedToken", newToken);
            return newToken;
        }
        return null;
    } catch (error) {
        console.error("Token refresh failed", error);
        return null;
    }
};

const request = async (
	method: string,
	url: string,
	data?: any,
	type?: "json" | "formData",
	retry = true
): Promise<any> => {
	const options: RequestOptions = {
		method,
		headers: {},
	};

	const token = localStorage.getItem("clerkFetchedToken");

	// Attach authorization header if token exists
	if (token) {
		options.headers["Authorization"] = `Bearer ${token}`;
	}

	// Setup request body depending on content type
	if (type === "formData") {
		const formData = new FormData();
		for (const key in data) {
			if (
				Array.isArray(data[key]) &&
				data[key].every((x: any) => x instanceof File)
			) {
				data[key].forEach((file: File) => formData.append(key, file));
			} else if (
				typeof data[key] === "object" &&
				!(data[key] instanceof File)
			) {
				Object.keys(data[key]).forEach((x) =>
					formData.append(x, data[key][x])
				);
			} else {
				formData.append(key, data[key]);
			}
		}
		options.body = formData;
	} else {
		options.headers["content-type"] = "application/json";
		options.body = JSON.stringify(data);
	}

	try {
		const res = await fetch(host + url, options);

		// Check for no content status (204) and return if successful
		if (res.status === 204) return;

		if (res.status === 401 && retry) {
			const newToken = await refreshToken();
			if (newToken) {
				return request(method, url, data, type, false); // Retry the request with the new token
			} else {
				localStorage.removeItem("clerkFetchedToken");
			}
		}

		const responseData = await res.json();

        if (!res.ok) {
            const errorMessage = Array.isArray(responseData.error)
                ? responseData.error.join(", ")
                : responseData.error || "An unexpected error occurred.";
            toast.error(errorMessage);

            if (res.status === 401 && retry) {
                const newToken = await refreshToken();
                if (newToken) {
                    return request(method, url, data, type, false); // Retry the request with the new token
                } else {
                    localStorage.removeItem("clerkFetchedToken");
                }
            }
            return null;
        }

		// Return parsed response data if successful
		return responseData;
	} catch (error) {
		console.error("Request failed", error);
		toast.error(getTranslation("apiResponses.networkError"));
		return null;
	}
};



// Export HTTP methods as bound instances of `request`
const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };
