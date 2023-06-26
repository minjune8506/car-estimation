export interface CarInfo {
  carId: string;
  name: string;
  lowPrice: string;
  imgPath: string;
}

export interface CategoryInfo {
  categoryId: string;
  categoryName: string;
  car: Array<CarInfo>;
}
