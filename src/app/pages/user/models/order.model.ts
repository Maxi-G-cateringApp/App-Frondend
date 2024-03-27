import { FoodCombo } from "../../admin/models/combo.model"
import { FoodItems } from "../../admin/models/foodItems.model"
import { FoodItemService } from "../../admin/service/food-item.service"

export type OrderDetails = {

    id: string,
    userId: string,
    date: Date,
    foodCombos: FoodCombo[],
    foodItems: FoodItems[],
    event:string,
    orderDate:Date,
    peopleCount:number,
    venue: string

}




// private UUID userId;
// private List<OrderedItems> items;
// private List<OrderedCombos> foodItemCombos;
// private String events;
// private LocalDate orderDate;
// private Integer peopleCount;
// private String venue;

