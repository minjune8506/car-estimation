import customAxios from "../../../common/utils/customAxios";
import { Response } from "../../../types/Response";
import { CarsPerCategory } from "../../../types/Car";
import { ONE_HOUR } from "../../../common/constants/constants";
import { useSetRecoilState } from "recoil";
import FocusedCarCategoryState from "../../../states/menu/FocusedCarCategoryState";
import { useQuery } from "@tanstack/react-query";
import { CarsPerCategoryKey } from "../../queryKeys";
import { AxiosResponse } from "axios";

async function fetchCarCategoryCars(): Promise<CarsPerCategory[]> {
  const axios = customAxios();
  const response: AxiosResponse<Response<CarsPerCategory[]>> = await axios.get(
    "/car/category/cars"
  );
  if (response.data.code) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export default () => {
  const setFocusedCategory = useSetRecoilState(FocusedCarCategoryState);

  return useQuery<CarsPerCategory[]>(
    CarsPerCategoryKey.all,
    fetchCarCategoryCars,
    {
      onSuccess: (data) => {
        data && data.length && setFocusedCategory(data[0].categoryId);
      },
      staleTime: ONE_HOUR,
    }
  );
};
