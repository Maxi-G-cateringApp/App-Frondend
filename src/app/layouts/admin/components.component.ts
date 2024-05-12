import { Component, OnInit } from '@angular/core';
import { User } from '../../pages/auth/models/user.model';
import { MasterService } from '../../core/services/master.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.css',
})
export class AdminComponent implements OnInit {
  admin!: User;
  notification: any[] = [];
  constructor(
    private masterService: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.masterService.getUserByRole().subscribe({
      next: (data) => {
        this.admin = data;
        const roomname = this.admin.id;
        // this.notificationService.getNotification(roomname).subscribe((data) => {
        //   this.notification = data;
        // });
        this.notificationService.connect(roomname);
      },
    });
  }
}
