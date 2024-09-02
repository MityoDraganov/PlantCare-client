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
	data?: any
): Promise<any> => {
	const options: RequestOptions = {
		method,
		headers: {},
	};

	options.headers["content-type"] = "application/json";
	options.body = JSON.stringify(data);

	const token = localStorage.getItem("clerkFetchedToken");

	if (token) {
		options.headers["Authorization"] = `Bearer ${token}`;
	}

	try {
		const res = await fetch(host + url, options);
		if(res.status == 204){
			return;
		}
		const responseData = await res.json();

		if (!res.ok) {
			if (Array.isArray(responseData.error)) {
				throw new Error(responseData.error.toString());
			}
			toast.error(responseData.error);
			throw new Error(responseData.error);
		}

		return responseData;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };
