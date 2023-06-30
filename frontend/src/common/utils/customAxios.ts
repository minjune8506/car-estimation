import axios, { AxiosRequestConfig } from "axios";

const { VITE_API_SERVER_URL } = import.meta.env;

const customAxios = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: VITE_API_SERVER_URL,
  };
  return axios.create(axiosConfig);
};

export default customAxios;
