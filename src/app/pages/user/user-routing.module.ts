import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: UserHomeComponent },
  { path: 'user-order', component: UserOrderComponent },
  {
    path: 'order-confirmation/:orderId',
    component: OrderConfirmationComponent,
  },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'orders', component: UserOrdersComponent },
  { path: 'user-profile',component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
