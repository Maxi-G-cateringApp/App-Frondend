import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserSideBarComponent } from './components/user-side-bar/user-side-bar.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { UserMenubarComponent } from './components/user-menubar/user-menubar.component';
import { UserComponent } from '../../layouts/user/user.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserSideBarComponent,
    UserOrderComponent,
    OrderConfirmationComponent,
    OrderSuccessComponent,
    UserMenubarComponent,
    UserComponent,
    UserOrdersComponent

 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class UserModule { }
