import { Component, OnInit } from '@angular/core';
import { FoodCombo } from '../../../model/itemModels/combo.model';
import { AuthService } from '../../../service/authService/auth-service.service';
import { FoodItemServicesService } from '../../../service/foodItemService/food-item-services.service';

@Component({
  selector: 'app-combo-items',
  templateUrl: './combo-items.component.html',
  styleUrl: './combo-items.component.css'
})
export class ComboItemsComponent implements OnInit{

  foodCombos!: FoodCombo[];

  constructor(private foodComboService: FoodItemServicesService){}

  ngOnInit(): void {
      this.foodComboService.getAllCombos().subscribe((response)=> {
        this.foodCombos = response;
        console.log(this.foodCombos);
        
      })
  }

}
