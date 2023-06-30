import { useQuery } from "react-query";
import customAxios from "../../common/utils/customAxios";
import { CarsPerCategoryKeys } from "./MenuKeys";
import { useSetRecoilState } from "recoil";
import FocusedCarCategory from "../../states/menu/FocusedCarCategoryState";
import { Response } from "../../types/Response";
import { CarsPerCategory } from "../../types/Car";
import CarsPerCategoryState from "../../states/menu/CarsPerCategoryState";
import { ONE_HOUR } from "../../common/constants/constants";

async function fetchCarCategoryCars(): Promise<Response<CarsPerCategory[]>> {
  const axios = customAxios();
  const response = await axios.get("/car/category/cars");
  return response.data;
}

export default () => {
  const setFocusedCarCategory = useSetRecoilState(FocusedCarCategory);
  const setCarCategoryCars = useSetRecoilState(CarsPerCategoryState);

  return useQuery<Response<CarsPerCategory[]>>(
    CarsPerCategoryKeys.all,
    fetchCarCategoryCars,
    {
      staleTime: ONE_HOUR,
      onSuccess: (data) => {
        setCarCategoryCars(data.data);
        data.data.length && setFocusedCarCategory(data.data[0].categoryId);
      },
    }
  );
};
