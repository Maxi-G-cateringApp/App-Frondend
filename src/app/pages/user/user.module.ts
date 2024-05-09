import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserSideBarComponent } from './components/user-side-bar/user-side-bar.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { UserMenubarComponent } from './components/user-menubar/user-menubar.component';
import { UserComponent } from '../../layouts/user/user.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ReviewComponent } from './components/view-order/review/review.component';
import { RatingComponent } from './components/view-order/rating/rating.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddFeedsComponent } from './components/add-feeds/add-feeds.component';
import { ChatComponent } from './components/chat/chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ContactUsComponent } from './components/contact-us/contact-us.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserSideBarComponent,
    UserOrderComponent,
    OrderConfirmationComponent,
    OrderSuccessComponent,
    UserMenubarComponent,
    UserComponent,
    UserOrdersComponent,
    ViewOrderComponent,
    ReviewComponent,
    RatingComponent,
    UserProfileComponent,
    AddFeedsComponent,
    ChatComponent,
    ContactUsComponent,

 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    PickerModule,
  ]
})
export class UserModule { }
