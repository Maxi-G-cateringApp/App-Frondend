import { Offer } from "./offer.model";

export interface FoodCombo{

    id?: number;
    comboName: string;
    description: string;
    comboPrice: number;
    offerPrice?: number;
    categoryId: number;
    offer?: Offer;
  

}