import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Response } from "../../types/Response";
import { VITE_API_SERVER_URL } from "../constants/constants";
import CustomError from "../CustomError";

export async function customFetch(url: string, config?: AxiosRequestConfig) {
  const response: AxiosResponse<Response<any>> = await axios(
    VITE_API_SERVER_URL + url,
    config
  );
  if (response.data.code) {
    throw new CustomError(response.data.code, response.data.message);
  }
  return response.data.data;
}
