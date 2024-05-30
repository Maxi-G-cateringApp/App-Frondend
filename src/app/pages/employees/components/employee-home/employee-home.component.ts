import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { MasterService } from '../../../../core/services/master.service';
import { getEmailFromState } from '../../../auth/state/auth.selector';
import { OrderDetails } from '../../../user/models/order.model';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css',
})
export class EmployeeHomeComponent implements OnInit {
  userId!: string;
  email!: string;
  employee!: any;
  responseData: any;
  orders!: any[];

  todayOrders: any[] = [];
  upcomingOrders: any[] = [];
  pastOrders: any[] = [];

  constructor(
    private store: Store<AppState>,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.getUserEmailFromStore();
    this.getEmployeeByEmail();
  }

  getUserEmailFromStore() {
    this.store.select(getEmailFromState).subscribe((data) => {
      if (data) {
        this.email = data;
        console.log(this.email);
      } else {
        console.error('id is null');
      }
    });
  }
  getEmployeeByEmail() {
    this.masterService.getEmployeeByEmail(this.email).subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
      this.getEmployeesTeam(this.employee.id);
    });
  }

  getEmployeesTeam(id: number) {
    this.masterService.getEmployeesTeam(id).subscribe((data) => {
      this.responseData = data;
      this.orders = this.responseData.orders;
      this.categorizeOrders();
    });
  }

  categorizeOrders() {
    const today = new Date();
    this.orders.forEach((order) => {
      const orderDate = new Date(order.date);
      if (this.isSameDay(orderDate, today)) {
        this.todayOrders.push(order);
      } else if (orderDate > today) {
        this.upcomingOrders.push(order);
      } else {
        this.pastOrders.push(order);
      }
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
}
