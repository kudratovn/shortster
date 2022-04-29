import Axios, { AxiosInstance } from "axios";

interface ErrorResponseData {
  message?: string;
  error?: any;
}
class Http {
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const data: ErrorResponseData = error.response.data;
        throw data.message || data.error || data || error.response;
      }
    );
  }

  get<T>(url: string) {
    return this.axios.get<T>(url);
  }
  post<T>(url: string, data?: any) {
    return this.axios.post<T>(url, data);
  }
}

const http = new Http();

export default http;