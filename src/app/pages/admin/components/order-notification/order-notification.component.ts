import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { ButtonModule } from 'primeng/button';
import { Notifications } from '../../models/notification.model';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrl: './order-notification.component.css',
})
export class OrderNotificationComponent implements OnInit {
  notifications: Notifications[] = [];
  constructor(
    private masterService: MasterService,
    private router: Router,
    private ref: MatDialogRef<OrderNotificationComponent>
  ) {}

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.masterService.getAllNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }

  viewOrder(id: number) {
    this.masterService.viewNotification(id).subscribe((res) => {
      this.getAllNotifications();
      this.router.navigate(['/admin/orders']);
      this.closePopup();
    });
  }

  deleteNotification(id: number) {
    this.masterService.deleteNotification(id).subscribe((res) => {
      this.getAllNotifications();
    });
  }

  closePopup() {
    this.ref.close();
  }
}
