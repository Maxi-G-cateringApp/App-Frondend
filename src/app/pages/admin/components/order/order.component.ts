import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetails } from '../../../user/models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from '../../../../core/services/master.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{


  constructor(private masterService: MasterService){}
  orders!: OrderDetails[];
  displayedColumns: string[] = ['itemName', 'itemPrice', 'action'];
  dataSource: any;
  itemId!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadOrders();
  }



  loadOrders(){
    this.masterService.getAllOrders().subscribe({next:(response)=>{
      console.log(response);
      
    }})
  }


}
