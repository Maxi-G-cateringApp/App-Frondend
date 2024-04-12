import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoodCombo } from '../../models/combo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { Categories } from '../../models/category.model';
import { ToastrService } from 'ngx-toastr';

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
  categoryList!: Categories[];
  category!: string;
  // uploadProfilePic!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private store: Store<AppState>,
    private tost: ToastrService,
    private ref: MatDialogRef<AddFoodComboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    if (this.inputData.isEdit) {
      this.setPopupdata(this.inputData.id);
    }
    this.loadCategories();

    this.foodComboForm = this.fb.group({
      comboName: ['', [Validators.required, this.whiteSpaceValidator]],
      description: ['', [Validators.required, this.whiteSpaceValidator]],
      comboPrice: ['', [Validators.required]],
      categoryId: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   this.foodComboForm.patchValue(this.selectedFile);
  // }

  onaddCombos() {
    if (this.inputData.isEdit) {
      this.onEdit(this.inputData.id);
    } else {
      if (this.foodComboForm.valid) {
        const comboData: FoodCombo = {
          comboName: this.foodComboForm.value.comboName,
          description: this.foodComboForm.value.description,
          comboPrice: this.foodComboForm.value.comboPrice,
          categoryId: this.foodComboForm.value.categoryId,
        };
        this.masterService
          .addFoodCombo(comboData, this.selectedFile)
          .subscribe((response) => {
            this.closePopup();
          });
      } else {
        this.tost.error('Enter valid Data', 'Invalid');
      }
    }
  }

  loadCategories() {
    this.masterService.getAllcategories().subscribe((response) => {
      this.categoryList = response;
    });
  }
  onEdit(id: number) {
    // if (this.foodComboForm.valid) {
      const formData = { ...this.foodComboForm.value };
      delete formData.file;
      this.masterService.editFoodCombo(id, formData).subscribe({
        next: (respose) => {
          this.closePopup();
        },
      });
    // } else {
    //   this.tost.error('Enter valid Data', 'Invalid');
    // }
  }

  setPopupdata(id: number) {
    this.masterService.getComboItem(id).subscribe((data) => {
      this.editData = data;
      this.foodComboForm.patchValue({
        comboName: this.editData.comboName,
        description: this.editData.description,
        comboPrice: this.editData.comboPrice,
      });
    });
  }

  closePopup() {
    this.ref.close();
  }

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.foodComboForm.patchValue(this.selectedFile);
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
