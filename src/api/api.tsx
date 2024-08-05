const host = process.env.NODE_ENV === "production" ? "" : "//localhost:8080/api/v1/";

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
    type?: string
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
        const responseData = await res.json();

        if (!res.ok) {
            if (res.status === 401) {
            } else {
                if (Array.isArray(responseData.message)) {
                    throw new Error(responseData.message.toString());
                }
                throw new Error(responseData.message);
            }
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
