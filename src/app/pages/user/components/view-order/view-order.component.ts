import { publishFacade } from '@angular/compiler';
import { Component, Inject, OnInit, input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MasterService } from '../../../../core/services/master.service';
import { UserOrder } from '../../models/userOrder.model';
import { ToastrService } from 'ngx-toastr';
import { ReviewModel } from '../../models/rating.model';
import { FoodCombo } from '../../../admin/models/combo.model';
import { FoodItems } from '../../../admin/models/foodItems.model';
import Swal from 'sweetalert2';

declare var Razorpay: any;
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
})
export class ViewOrderComponent implements OnInit {
  inputdata!: any;
  order!: UserOrder;
  orderId!: string;
  amount!: number;
  advanceAmount!: number;
  orderReview!: ReviewModel;
  combos: FoodCombo[] = [];
  items: FoodItems[] = [];
  orderedCombos!: any[];
  orderedItems!: any[];

  constructor(
    private ref: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService,
    private toster: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.getAmount();
    this.loadOrder();
  }

  getAmount() {
    this.masterService
      .getTotalAmount(this.inputdata.orderId)
      .subscribe((response) => {
        this.amount = response.amount;
        this.advanceAmount = (this.amount * 25) / 100;
      });
  }

  loadOrder() {
    this.masterService.getOrderById(this.inputdata.orderId).subscribe({
      next: (response) => {
        console.log(response, 'order details');

        this.orderReview = response.review;
        this.order = response;
        this.orderedCombos = response.orderedCombos;
        this.orderedItems = response.orderedItems;

        for (const orderedCombo of this.orderedCombos) {
          this.combos.push(orderedCombo.foodCombos);
        }
        for (const orderedItem of this.orderedItems) {
          this.items.push(orderedItem.foodItems);
        }
      },
    });
  }

  onCancelOrder() {
    this.masterService.cancelOrder(this.inputdata.orderId).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === true) {
          this.toster.success('order cancelled', response.message);
        } else {
          this.toster.error('contact Administrator!', response.message);
        }
      },
    });
  }

  onPayment() {
    this.masterService
      .createTransaction(this.inputdata.orderId)
      .subscribe((response) => {
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

  orderSuccess(transactionId: string) {
    const data = {
      orderId: this.inputdata.orderId,
      totalAmount: this.amount,
      advanceAmount: this.advanceAmount,
      transactionId: transactionId,
    };
    console.log(data, 'success data');
    this.masterService.orderSuccess(data).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Good job!",
          text: "Payment Success!",
          icon: "success"
        });
        this.closePopup();
       
      },
    });
  }

  closePopup() {
    this.ref.close();
  }
}
