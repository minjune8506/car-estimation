import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { VITE_API_SERVER_URL } from "../constants/env.constants";
import { Response } from "../../types/Response";

export async function customFetch(url: string, config?: AxiosRequestConfig) {
  const response: AxiosResponse<Response<any>> = await axios(
    VITE_API_SERVER_URL + url,
    config
  );
  if (response.data.code) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}
