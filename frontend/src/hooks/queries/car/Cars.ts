import { useQuery } from "@tanstack/react-query";
import { Car, CarColors } from "src/types/Car";
import { CarKeys } from "../queryKeys";
import { carAPI } from "./api";

export function useCarInfo(carId: number) {
  return useQuery<Car, Error>({
    queryKey: CarKeys.findById(carId),
    queryFn: async () => {
      const data = await carAPI.fetchCarInfo(carId);
      return data;
    },
  });
}

export function useCarColors(carId: number, modelId: number) {
  return useQuery<CarColors, Error>({
    queryKey: CarKeys.colors(carId, modelId),
    queryFn: async () => {
      const data = await carAPI.fetchCarColors(carId, modelId);
      return data;
    },
  });
}
