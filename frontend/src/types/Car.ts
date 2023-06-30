import { CarCategory } from "./CarCategory";

export interface Car {
  carId: number;
  carName: string;
  lowPrice: number;
  carImg: string;
}

export interface CarsPerCategory extends CarCategory {
	cars: Car[];
  }
