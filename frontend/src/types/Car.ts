import { ExteriorColor, InteriorColor } from "./Color";

export interface Car {
  carId: number;
  carName: string;
  carNameEn: string;
  lowPrice: number;
  carImg: string;
}

export interface CarColorsQueryParam {
  carId: number;
  modelId: number;
}

export interface CarColors {
  exteriorColors: ExteriorColor[];
  interiorColors: InteriorColor[];
}
