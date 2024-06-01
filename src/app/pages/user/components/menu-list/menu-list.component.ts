import { Component, OnInit } from '@angular/core';
import { FoodItems } from '../../../admin/models/foodItems.model';
import { FoodCombo } from '../../../admin/models/combo.model';
import { MasterService } from '../../../../core/services/master.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit{

  foodItems!: FoodItems[];
  foodCombos!: FoodCombo[];
  constructor(private masterService: MasterService){}

  ngOnInit(): void {
      this.getAllFoodItems()
      this.getAllFoodCombos()
  }

  getAllFoodItems(){
    this.masterService.getAllFoodItems().subscribe((data)=>{
      this.foodItems = data;
    })
  }

  getAllFoodCombos(){
    this.masterService.getAllCombos().subscribe((data)=>{
      this.foodCombos = data;
    })
  }


}
