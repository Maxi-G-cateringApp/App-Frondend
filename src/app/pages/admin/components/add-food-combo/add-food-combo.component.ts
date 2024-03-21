import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodCombo } from '../../models/combo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-add-food-combo',
  templateUrl: './add-food-combo.component.html',
  styleUrl: './add-food-combo.component.css',
})
export class AddFoodComboComponent implements OnInit, AfterViewInit {
  foodComboForm!: FormGroup;
  selectedFile!: File;
  inputData: any;
  editData!: FoodCombo;
  editId: number = 0;
  items: string[] = ["VEG","NON_VEG"];

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private store: Store<AppState>,
    private ref: MatDialogRef<AddFoodComboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    if(this.inputData.isEdit){
      this.setPopupdata(this.inputData.id);
    }
 
    this.foodComboForm = this.fb.group({
      comboName: ['', Validators.required],
      description: ['', Validators.required],
      comboPrice: ['', Validators.required],
      category: ['',Validators.required],
      
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.foodComboForm.patchValue(this.selectedFile);
  }

  onaddCombos() {
    if (this.foodComboForm.valid) {
      if(this.inputData.isEdit){
        this.onEdit(this.inputData.id)
      }else{
      this.masterService
        .addFoodCombo(this.foodComboForm.value)
        .subscribe((response) => {
          console.log(response);
          
          this.closePopup(); 
        });
      }
    } else {
      console.error();
    }
  }

  onEdit(id: number) {    
    this.masterService
      .editFoodCombo(id, this.foodComboForm.value)
      .subscribe((response) => {
        this.closePopup(); 
      },
      (error)=>{console.log(error);
      }
      );
  }

  setPopupdata(id: number) {
    this.masterService.getComboItem(id).subscribe((data) => {
      this.editData = data;
      this.foodComboForm.setValue({
        category: this.editData.category,
        comboName: this.editData.comboName,
        description: this.editData.description,
        comboPrice: this.editData.comboPrice,
      });
    });
  }

  closePopup() {
    this.ref.close();
  }
}
