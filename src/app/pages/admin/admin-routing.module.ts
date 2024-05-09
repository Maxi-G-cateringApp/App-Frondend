import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { AddFoodComboComponent } from "./components/add-food-combo/add-food-combo.component";
import { ComboItemsComponent } from "./components/combo-items/combo-items.component";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { FoodItemsComponent } from "./components/food-items/food-items.component";
import { AddCategoriesComponent } from "./components/add-categories/add-categories.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { EventsComponent } from "./components/events/events.component";
import { AddEventComponent } from "./components/add-event/add-event.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { AddServingTeamComponent } from "./components/team/serving-teams/add-serving-team/add-serving-team.component";
import { ServingTeamsComponent } from "./components/team/serving-teams/serving-teams.component";
import { AddServingEmployeesComponent } from "./components/team/serving-teams/add-serving-employees/add-serving-employees.component";
import { DecorationTeamsComponent } from "./components/team/decoration-teams/decoration-teams.component";
import { KitchenCrewTeamsComponent } from "./components/team/kitchen-crew-teams/kitchen-crew-teams.component";
import { RoleGuard } from "../../guards/guard";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ChatListComponent } from "./components/chat-list/chat-list.component";



const routes: Routes = [
    {
      path: '',
      children: [
        {path: 'login',component:AdminLoginComponent},
        {path: 'home', component:AdminHomeComponent},
        {path: 'all_combos', component: ComboItemsComponent},
        {path: 'add_combo', component: AddFoodComboComponent },
        {path: 'food-items',component: FoodItemsComponent},
        {path: 'add_item',component: AddItemComponent},
        {path: 'categories',component: CategoriesComponent},
        {path: 'add_category',component: AddCategoriesComponent},
        {path: 'events',component: EventsComponent},
        {path: 'add-events',component: AddEventComponent},
        {path: 'orders',component: OrderComponent},
        {path: 'view-order/:orderId',component: OrderDetailsComponent},
        {path: 'serve-team',component: ServingTeamsComponent},
        {path: 'decor-team',component: DecorationTeamsComponent},
        {path: 'kitchenCrew-team',component: KitchenCrewTeamsComponent},
        {path: 'all-users',component:UsersListComponent},
        {path: 'employees',component:EmployeeListComponent},
        {path: 'chat',component:ChatListComponent}
      ],
    },
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }