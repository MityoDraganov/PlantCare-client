// api.ts
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const host = "http://localhost:8080/api/v1/";

interface RequestOptions {
  method: string;
  headers: {
    "content-type"?: string;
    Authorization?: string;
  };
  body?: string | FormData;
}

class ApiService {
  token: string | null = null;

  constructor() {
    this.initializeToken();
  }

  async initializeToken() {
    const { getToken } = useAuth();
    this.token = await getToken();
  }

  async request(method: string, url: string, data?: any): Promise<any> {
    if (!this.token) {
      throw new Error("Token is not ready yet");
    }

    const options: RequestOptions = {
      method,
      headers: {
        "content-type": "application/json",
        Authorization: this.token ? `Bearer ${this.token}` : "",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(host + url, options);
      const responseData = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Session expired, please log in again.");
        } else {
          if (Array.isArray(responseData.message)) {
            toast(responseData.message.toString());
            throw new Error(responseData.message.toString());
          }
          toast(responseData.message);
          throw new Error(responseData.message);
        }
      }

      return responseData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  get = this.request.bind(this, "GET");
  post = this.request.bind(this, "POST");
  put = this.request.bind(this, "PUT");
  patch = this.request.bind(this, "PATCH");
  delete = this.request.bind(this, "DELETE");
}

const apiService = new ApiService();
export default apiService;