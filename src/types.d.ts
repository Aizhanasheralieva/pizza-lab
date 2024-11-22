export interface IPizzaDishes {
  title: string;
  price: number;
  image_URL: string;
  id?: string;
}

export interface IPizzaDishesForm {
  title: string;
  price: number;
  image_URL: string;
}

export interface IPizzaDishesFromAPI {
  [id: string]: IPizzaDishes;
}

export interface PizzaDishesCart {
  dish: IPizzaDishes;
  amount: number;
}
