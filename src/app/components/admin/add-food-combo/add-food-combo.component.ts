import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodItemServicesService } from '../../../service/foodItemService/food-item-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-food-combo',
  templateUrl: './add-food-combo.component.html',
  styleUrl: './add-food-combo.component.css'
})
export class AddFoodComboComponent implements OnInit{

  constructor(private fb: FormBuilder,private comboService: FoodItemServicesService, private router: Router){

  }

  foodComboForm!: FormGroup;

  ngOnInit(): void {
    this.foodComboForm = this.fb.group({
      comboName: ['',Validators.required],
      description: ['',Validators.required],
      comboPrice: ['',Validators.required]

    })
  }



  onaddCombos(){
    console.log(this.foodComboForm.value);
    this.comboService.addFoodCombo(this.foodComboForm.value).subscribe((response)=> {
      console.log(response+"responce from backend")
      this.router.navigateByUrl('/all_combos');
    })
  }

}
