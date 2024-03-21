import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodItems } from '../../models/foodItems.model';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent implements OnInit,AfterViewInit{
  addItemForm!: FormGroup;
  inputData: any;
  editData!: FoodItems;
  items: string[] = ['VEG', 'NON_VEG'];

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private ref: MatDialogRef<AddItemComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    if(this.inputData.isEdit){
      this.setPopupdata(this.inputData.id);
    }
    this.addItemForm = this.fb.group({
      category: ['', Validators.required],
      itemName: ['', Validators.required],
      itemPrice: ['', Validators.required],
      
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }
  onaddItem() {
    if (this.addItemForm.valid) {
      console.log(this.addItemForm.value);
      
      if(this.inputData.isEdit){
        this.onEdit(this.inputData.id)
      }else{
      this.masterService
        .addFoodItem(this.addItemForm.value)
        .subscribe((response) => {
          console.log(response);

          this.closePopup();
        });
      }
    } else {
      console.error();
    }
  }

  closePopup() {
    this.ref.close();
  }

  onEdit(id: number) {
    this.masterService
      .editFoodItem(id, this.addItemForm.value)
      .subscribe((response) => {
        this.closePopup();
      });
  }

  setPopupdata(id: number) {
    this.masterService.getItem(id).subscribe((data) => {
      this.editData = data;
      this.addItemForm.setValue({
        category: this.editData.category,
        itemName: this.editData.itemName,
        itemPrice: this.editData.itemPrice,
      });
    });
  }
}
