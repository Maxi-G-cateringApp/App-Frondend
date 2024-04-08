import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import { UserOrder } from '../../models/userOrder.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var Razorpay: any;
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css',
})
export class UserOrdersComponent implements OnInit {
  userId: string = '';
  orders!: UserOrder[];
  amount!: number;
  advanceAmount!: number;
  orderId!: string;
  transactionId!:string;
  cancelBtn: boolean = true;

  constructor(
    private masterService: MasterService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private toster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.amount = this.route.snapshot.queryParams['amount'];
    this.advanceAmount = this.route.snapshot.queryParams['advanceAmount'];

    this.store.select(getuserId).subscribe((data) => {
      if (data) {
        this.userId = data;
        console.log(this.userId);
      }
    });

    this.loadUserOrders();
  }

  onPayment(id: string) {
    this.orderId = id;
    this.masterService.createTransaction(id).subscribe((response) => {
      console.log(response);
      this.openTransactionModel(response);
    }),
      (error: any) => {
        console.log(error);
      };
  }

  openTransactionModel(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      curency: response.currency,
      name: 'Maxi-G',
      description: 'Payment for Order',
      image: '/assets/logo2_processed.png',
      handler: (response: any) => {
        if (response != null && response.razorpay_payment_id != null) {
          this.processResponse(response);
        } else {
          this.toster.error('Failed', 'Payment failed! Something Wrong');
        }
      },
      prefill: {
        name: 'Maxi-G Admin',
        email: 'maxigcaters@gmail.com',
        contact: '9876543210',
      },
      note: {
        address: 'online orders',
      },
      theme: {
        color: '#060e3d',
      },
    };

    var razorpayObject = new Razorpay(options);
    razorpayObject.open();
  }

  processResponse(resp: any) {
    this.orderSuccess(resp.razorpay_payment_id);
  }

  loadUserOrders() {
    this.masterService.getOrderByUser(this.userId).subscribe({
      next: (response) => {
        this.orders = response;
        
      },
    });
  }

  orderSuccess(transactionId: string){
    const data = {
      orderId: this.orderId,
      totalAmount: this.amount,
      advanceAmount: this.advanceAmount,
      transactionId:transactionId
    }
    this.masterService.orderSuccess(data).subscribe({next:(response)=>{
      console.log(response);
      location.reload();

      // const matchingOrder = this.orders.find(order=> order.id === response.id || order.transactionId === transactionId ) 
      // if(matchingOrder){
      //   matchingOrder.isPaymentComplete = true;
      // }


    }})
  }

  onCancelOrder(id: string){
    this.masterService.cancelOrder(id).subscribe({next:(response)=>{
      console.log(response);
      if(response.status === true){
        // this.cancelBtn = false;
        this.toster.success('order cancelled',response.message)
      }else{
        this.toster.error('contact Administrator!',response.message)
      }
      
    }})

  }
}
