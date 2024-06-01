import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import { UserOrder } from '../../models/userOrder.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css',
})
export class UserOrdersComponent implements OnInit {
  userId: string = '';
  orders!: UserOrder[];
  maxRatingArr = [];

  constructor(
    private masterService: MasterService,
    private store: Store<AppState>,

    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.select(getuserId).subscribe((data) => {
      if (data) {
        this.userId = data;
      }
    });

    this.loadUserOrders();
  }

  loadUserOrders() {
    this.masterService.getOrderByUser(this.userId).subscribe({
      next: (response) => {
        this.orders = response;
      },
    });
  }

  viewOrder(orderId: string) {
    this.openPopup(orderId);
  }

  openPopup(orderId: string) {
    var _popup = this.dialog.open(ViewOrderComponent, {
      width: '60%',
      data: {
        orderId: orderId,
      },
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadUserOrders();
    });
  }
}
