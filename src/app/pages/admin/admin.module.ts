import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AddFoodComboComponent } from './components/add-food-combo/add-food-combo.component';
import { ComboItemsComponent } from './components/combo-items/combo-items.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FoodItemsComponent } from './components/food-items/food-items.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AdminMenubarComponent } from './components/admin-menubar/admin-menubar.component';
import { AdminComponent } from './components.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AddFoodComboComponent,
    ComboItemsComponent,
    AddItemComponent,
    FoodItemsComponent,
    AdminMenubarComponent,
    AdminComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule,MaterialModule,],
})
export class AdminModule {}
