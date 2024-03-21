import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { FoodCombo } from '../../../admin/models/combo.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FoodItems } from '../../../admin/models/foodItems.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css'
})
export class UserOrderComponent implements OnInit{

  orderForm!: FormGroup;
  comboItemList!: FoodCombo[];
  itemList!: FoodItems[];
  constructor(private masterService: MasterService){}

  ngOnInit(): void {
    this.getAllCombos();
    this.getAllitems();
  }

  getAllCombos(){
    this.masterService.getAllCombos().subscribe((response)=> {
      this.comboItemList =  response;
      
    })
  }

  getAllitems(){
    this.masterService.getAllFoodItems().subscribe((response)=>{
      this.itemList = response

    })
  }

}
