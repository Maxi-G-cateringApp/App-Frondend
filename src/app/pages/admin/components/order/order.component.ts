import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetails } from '../../../user/models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from '../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  constructor(private masterService: MasterService, private router: Router) {}
  orders!: OrderDetails[];
  displayedColumns: string[] = [
    'eventName',
    'date',
    'venue',
    'peopleCount',
    'action',
  ];
  dataSource: any;
  itemId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.masterService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response;
        console.log(this.orders);

        this.dataSource = new MatTableDataSource<OrderDetails>(this.orders);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  viewOrder(orderId: string) {
    console.log( orderId," selected order id");
    
    this.router.navigate(['/admin/view-order', orderId]);
  }
}
