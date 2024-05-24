import { FoodCombo } from './combo.model';
import { FoodItems } from './foodItems.model';

export interface Offer {
  id?: number;
  offerName: string;
  discount: number;
  comboId: number;
  foodItemCombo?: FoodCombo;
  enabled?: boolean;
}
