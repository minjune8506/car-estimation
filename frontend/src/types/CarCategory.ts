import { Car } from "./Car";

export interface CarCategory {
  categoryId: number;
  categoryName: string;
}

export interface CategoryCars extends CarCategory {
  cars: Car[];
}
