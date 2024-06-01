import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { UserComponent } from '../../layouts/user/user.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ReviewComponent } from './components/view-order/review/review.component';
import { RatingComponent } from './components/view-order/rating/rating.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddFeedsComponent } from './components/add-feeds/add-feeds.component';
import { ChatComponent } from './components/chat/chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { OfferComponent } from './components/offer/offer.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';




@NgModule({
  declarations: [
    UserHomeComponent,
    UserOrderComponent,
    OrderConfirmationComponent,
    UserComponent,
    UserOrdersComponent,
    ViewOrderComponent,
    ReviewComponent,
    RatingComponent,
    UserProfileComponent,
    AddFeedsComponent,
    ChatComponent,
    OfferComponent,
    MenuListComponent
    

 
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
