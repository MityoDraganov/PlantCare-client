import toast from "react-hot-toast";

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

const request = async (
	method: string,
	url: string,
	data?: any,
	type?: "json" | "formData"
): Promise<any> => {
	const options: RequestOptions = {
		method,
		headers: {},
	};

	const token = localStorage.getItem("clerkFetchedToken");

	if (token) {
		options.headers["Authorization"] = `Bearer ${token}`;
	}
	if (type === "formData") {
		const formData = new FormData();

		for (const key in data) {
			if (
				Array.isArray(data[key]) &&
				data[key].every((x: any) => x instanceof File)
			) {
				// If the value is an array of Files, append each file
				data[key].forEach((file: File) => {
					formData.append(key, file);
				});
			} else if (
				typeof data[key] === "object" &&
				!(data[key] instanceof File)
			) {
				Object.keys(data[key]).map((x) => {
					formData.append(x, data[key][x]);
				});
			} else {
				// Otherwise, append as usual
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
		if (res.status == 204) {
			return;
		}
		const responseData = await res.json();

		if (!res.ok) {
			if (res.status === 401) {
				localStorage.removeItem("Authorization");
				return;
			}
			if (Array.isArray(responseData.error)) {
				toast.error(responseData.error.toString());
			}
			toast.error(responseData.error);
			return;
		}

		return responseData;
	} catch (error: any) {
		toast.error(error.error);
	}
};

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };
