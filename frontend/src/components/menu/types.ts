export interface Car {
  carId: number;
  carName: string;
  lowPrice: number;
  carImg: string;
}

export interface CarCategory {
  categoryId: number;
  categoryName: string;
}

export interface CarCategoryCars extends CarCategory {
  cars: Car[];
}
