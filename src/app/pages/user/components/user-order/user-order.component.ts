import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { FoodCombo } from '../../../admin/models/combo.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodItems } from '../../../admin/models/foodItems.model';
import { Events } from '../../../admin/models/event.model';
import { Categories } from '../../../admin/models/category.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import { OrderDetails } from '../../models/order.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  decorationOptionList:string[]=['YES','NO'];
  userId!: string;
  orderId!: string;
  foodComboFormArray: FormArray | undefined;
  minDate!: Date;

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private tost: ToastrService,
  ) { this.minDate = new Date();}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      date: ['', Validators.required],
      foodCombos: this.fb.array([], Validators.required),
      categoryControl: ['', Validators.required],
      foodItems: this.fb.array([]),
      event: ['', Validators.required],
      peopleCount: [0, [Validators.required,Validators.min(0),Validators.max(5000)]],
      venue: ['', Validators.required],
      timeFrom: ['',Validators.required],
      timeTo: ['',Validators.required],
      decorationOption: ['',Validators.required]


    });

    this.getAllEvents();
    this.getAllCategory();
    this.store.select(getuserId).subscribe((data) => {
      this.userId = data || '';
    });
  }
  filterDates = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d ? d >= today: false;
  }

  onSaveOrder() {
    const data: OrderDetails = {
      date: this.orderForm.value.date,
      foodCombos: this.orderForm.value.foodCombos,
      decorationOption: this.orderForm.value.decorationOption,
      foodItems: this.orderForm.value.foodItems,
      eventId: this.orderForm.value.event,
      peopleCount: this.orderForm.value.peopleCount,
      venue: this.orderForm.value.venue,
      timeFrom: this.orderForm.value.timeFrom,
      timeTo: this.orderForm.value.timeTo,
      userId: this.userId
    }
    if(this.orderForm.valid){
    this.masterService.saveOrder(data).subscribe((response) => {
      console.log(response);
      const orderId = response.orderId;
      if (orderId) {
        this.router.navigate(['/user/order-confirmation', orderId]);
      } else {
        console.error('Order ID is missing in the response');
      }
    });
  }else{
    this.tost.error('something Wrong','check the credentials')
  }
  }

  onComboChange(event: any) {
    const foodComboFormArray = this.orderForm.get('foodCombos') as FormArray; 
    this.foodComboFormArray = this.orderForm.get('foodCombos') as FormArray; 
  
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
    console.log(category);
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
