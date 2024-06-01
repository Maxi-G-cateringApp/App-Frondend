import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddFeedsComponent } from './components/add-feeds/add-feeds.component';
import { ChatComponent } from './components/chat/chat.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  { path: 'home', component: UserHomeComponent },
  { path: 'user-order', component: UserOrderComponent },
  {
    path: 'order-confirmation/:orderId',
    component: OrderConfirmationComponent,
  },  { path: 'orders', component: UserOrdersComponent },
  { path: 'user-profile',component: UserProfileComponent },
  { path: 'add-feed',component: AddFeedsComponent},
  { path: 'chat',component: ChatComponent},
  { path: 'menu',component: MenuListComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
