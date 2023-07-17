export interface Color {
  id: number;
  name: string;
  code: string;
  choiceYn?: boolean;
}

export interface InteriorColor extends Color {}

export interface ExteriorColor extends Color {}
