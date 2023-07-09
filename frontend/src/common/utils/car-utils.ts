import { CategoryCars } from "../../types/CarCategory";

export function getCarName(data: CategoryCars[], carId: number): string {
  for (const category of data) {
    const found = category.cars.find((car) => car.carId === carId);
    if (found) {
      return found.carName;
    }
  }
  return "Error";
}
