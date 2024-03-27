import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';



const routes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: 'user-order', component: UserOrderComponent },
  { path: 'user-order', component: OrderConfirmationComponent },
  { path: 'order-confirmation/:orderId', component: OrderSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
