import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {toastError} from "@/utils/toast-util";
import {Theme} from "@mui/material/styles";

export const HOST_API = "http://localhost:8080/";

const axiosInstance = axios.create({ baseURL: HOST_API });
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const formatAndParseResponseError = (e: AxiosError<{ errors: any }>, theme: Theme) => {
  if (e?.response?.data?.errors) {
    const responseError = e?.response?.data?.errors;
    Object.keys(responseError).forEach((item) => {
      toastError(`${item} ${responseError[item]}`, theme);
    });
  } else {
    toastError(e.message, theme);
  }
}
