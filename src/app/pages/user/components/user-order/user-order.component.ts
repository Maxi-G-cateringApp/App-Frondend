import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { FoodCombo } from '../../../admin/models/combo.model';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodItems } from '../../../admin/models/foodItems.model';
import { Events } from '../../../admin/models/event.model';
import { Categories } from '../../../admin/models/category.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import { OrderDetails } from '../../models/order.model';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css',
})
export class UserOrderComponent implements OnInit {
  orderForm!: FormGroup;
  comboItemList!: FoodCombo[];
  itemList!: FoodItems[];
  eventList!: Events[];
  categories!: Categories[];
  selectedItems: any[] = [];
  categoryId!: number;
  venueList: string[] = ['HOUSE', 'AUDITORIUM'];
  userId!: string | undefined;
  orderId!: string;

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      date: ['', Validators.required],
      foodCombos: this.fb.array([], Validators.required),
      categoryControl: ['', Validators.required],
      foodItems: this.fb.array([], Validators.required),
      event: ['', Validators.required],
      peopleCount: ['', Validators.required],
      venue: ['', Validators.required],
    });

    this.getAllEvents();
    this.getAllCategory();
    this.store.select(getuserId).subscribe((data) => {
      this.userId = data;
    });
  }

  onSaveOrder() {
    const formData = { ...this.orderForm.value, userId: this.userId };
    console.log(formData);
    this.masterService.saveOrder(formData).subscribe((response) => {
      console.log(response);
      const orderId = response.orderId;
      if (orderId) {
        this.router.navigate(['/user/order-confirmation', orderId]);
      } else {
        console.error('Order ID is missing in the response');
      }
    });
  }

  onComboChange(event: any) {
    const foodComboFormArray = this.orderForm.get('foodCombos') as FormArray;
    console.log(foodComboFormArray);
    
    foodComboFormArray.clear();
    event.forEach((foodCombos: FoodCombo) => {
      foodComboFormArray.push(this.fb.control(foodCombos));
    });
  }

  onItemChange(event: any) {
    const foodItemFormArray = this.orderForm.get('foodItems') as FormArray;
    foodItemFormArray.clear();
    event.forEach((foodItems: FoodItems) => {
      foodItemFormArray.push(this.fb.control(foodItems));
    });
  }

  onCategoryChange(category: number) {
    this.masterService
      .getAllCombosByCategory(category)
      .subscribe((response) => {
        this.comboItemList = response;
      });

    this.masterService.getAllItemByCategory(category).subscribe((response) => {
      this.itemList = response;
    });
  }

  getAllEvents() {
    this.masterService.getAllEvents().subscribe((response) => {
      this.eventList = response;
    });
  }
  getAllCategory() {
    this.masterService.getAllcategories().subscribe((response) => {
      this.categories = response;
    });
  }
}
