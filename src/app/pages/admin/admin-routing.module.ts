import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { AddFoodComboComponent } from "./components/add-food-combo/add-food-combo.component";
import { ComboItemsComponent } from "./components/combo-items/combo-items.component";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { FoodItemsComponent } from "./components/food-items/food-items.component";
import { AdminComponent } from "./components.component";
import { AddCategoriesComponent } from "./components/add-categories/add-categories.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { EventsComponent } from "./components/events/events.component";
import { AddEventComponent } from "./components/add-event/add-event.component";



const routes: Routes = [
    {
      path: '',
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component:AdminHomeComponent},
        {path: 'all_combos', component: ComboItemsComponent},
        { path: 'add_combo', component: AddFoodComboComponent },
        {path: 'food-items',component: FoodItemsComponent},
        {path: 'add_item',component: AddItemComponent},
        {path: 'categories',component: CategoriesComponent},
        {path: 'add_category',component: AddCategoriesComponent},
        {path: 'events',component: EventsComponent},
        {path: 'add-events',component: AddEventComponent},
      ],
    },
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }