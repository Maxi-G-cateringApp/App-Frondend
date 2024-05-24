import { OrderDetails } from "../../user/models/order.model";

export interface Notifications {
    id:number;
    message: string;
    order: OrderDetails;
    open:boolean;
}