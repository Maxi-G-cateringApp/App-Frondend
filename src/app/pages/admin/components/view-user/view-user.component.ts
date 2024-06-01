import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../../../core/services/master.service';
import { User } from '../../../auth/models/user.model';
import { UserOrder } from '../../../user/models/userOrder.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent implements OnInit {
  inputData!: any;
  userId!: string;
  user!: User;
  orders!: UserOrder[];
  length!: number;

  constructor(
    private ref: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.userId = this.inputData.id;
    this.getUserById();
    this.loadUserOrders();
  }

  getUserById() {
    this.masterService.getUserById(this.userId).subscribe((response) => {
      this.user = response;
    });
  }

  loadUserOrders() {
    this.masterService.getOrderByUser(this.userId).subscribe({
      next: (response) => {
        this.orders = response;
        this.length = this.orders.length;
      },
    });
  }

  onAddPartner() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to make this user as Partner!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.masterService.addPartner(this.userId).subscribe((response) => {
          Swal.fire({
            title: 'Added!',
            text: 'New partner Added.',
            icon: 'success',
          });
          this.getUserById();
          this.closePopup();
        });
      }
    });
  }

  closePopup() {
    this.ref.close();
  }
}
