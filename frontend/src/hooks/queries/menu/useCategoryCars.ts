import customAxios from "../../../common/utils/customAxios";
import { Response } from "../../../types/Response";
import { ONE_HOUR } from "../../../common/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CategoryKeys } from "../queryKeys";
import { CategoryCars } from "../../../types/CarCategory";

async function fetchCategoryCars(): Promise<CategoryCars[]> {
  const axios = customAxios();
  const response: AxiosResponse<Response<CategoryCars[]>> = await axios.get(
    "/car/categories/cars"
  );
  if (response.data.code) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export default () => {
  return useQuery<CategoryCars[], Error>(
    CategoryKeys.categoryCars,
    fetchCategoryCars,
    {
      staleTime: ONE_HOUR,
    }
  );
};
