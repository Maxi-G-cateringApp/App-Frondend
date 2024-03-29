import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit{

  orderId! :string;
  advanceAmount! : number;


  constructor(private masterService: MasterService){

  }

  ngOnInit(): void {

    // this.masterService.getTotalAmount(this.orderId).subscribe((response)=>{
    //   console.log(response,'may be amount');
      
    //   const amount = response.amount;
    //   this.advanceAmount = amount * 10 /100;
    // })
      
  }

}



 