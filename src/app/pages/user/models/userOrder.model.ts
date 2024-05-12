import { FoodCombo } from "../../admin/models/combo.model";
import { Events } from "../../admin/models/event.model";
import { FoodItems } from "../../admin/models/foodItems.model";
import { User } from "../../auth/models/user.model";
import { Address } from "./address.model";
import { ReviewModel } from "./rating.model";

export interface UserOrder {

    id: string;
    user: User
    orderedCombos: FoodCombo[];
    orderedItems: FoodItems[];
    orderDate: Date;
    events: Events;
    peopleCount: number;
    timeFrom: string;
    timeTo: string;
    userLocation: Address;
    date: Date
    venue: string;
    status: string;
    transactionId: string;
    isPaymentComplete:boolean;
    review: ReviewModel
    decorationOption?: string;
}