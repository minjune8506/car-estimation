import { customFetch } from "src/common/utils/customFetch";
import { Car, CarColors } from "src/types/Car";
import { CategoryCars } from "src/types/CarCategory";

export const carAPI = {
  fetchCategoryCars: (): Promise<CategoryCars[]> => {
    return customFetch("/car/categories/cars", { method: "get" });
  },
  fetchCarInfo: (carId: number): Promise<Car> => {
    return customFetch(`/cars/${carId}`, { method: "get" });
  },
  fetchCarColors: (carId: number, modelId: number): Promise<CarColors> => {
    return customFetch(`/cars/${carId}/colors`, {
      method: "get",
      params: { modelId },
    });
  },
};
