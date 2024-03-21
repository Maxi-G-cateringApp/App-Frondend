import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSideBarComponent } from './components/user-side-bar/user-side-bar.component';
import { MaterialModule } from '../../shared/material/material.module';
import { UserOrderComponent } from './components/user-order/user-order.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserSideBarComponent,
    UserOrderComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class UserModule { }
