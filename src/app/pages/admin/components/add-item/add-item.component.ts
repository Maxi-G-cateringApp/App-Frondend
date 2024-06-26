import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodItems } from '../../models/foodItems.model';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { Categories } from '../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { getErrorMessage } from '../../../../shared/store/shared.selector';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent implements OnInit, AfterViewInit {
  addItemForm!: FormGroup;
  inputData: any;
  editData!: FoodItems;
  categoryList!: Categories[];
  showErrorMessage!: Observable<string>;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private ref: MatDialogRef<AddItemComponent>,
    private tost: ToastrService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.showErrorMessage = this.store.select(getErrorMessage);

    this.inputData = this.data;

    if (this.inputData.isEdit) {
      this.setPopupdata(this.inputData.id);
    }
    this.loadCategories();
    this.addItemForm = this.fb.group({
      itemName: ['', [Validators.required, this.whiteSpaceValidator]],
      itemPrice: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }
  onaddItem() {
    if (this.inputData.isEdit) {
      this.onEdit(this.inputData.id);
    } else {
      if (this.addItemForm.valid) {
        const itemdata: FoodItems = {
          itemName: this.addItemForm.value.itemName,
          itemPrice: this.addItemForm.value.itemPrice,
          categoryId: this.addItemForm.value.categoryId,
        };
        this.masterService
          .addFoodItem(itemdata, this.selectedFile)
          .subscribe((response) => {
            this.tost.success('Item Added', 'Successfully added food Item');
            this.closePopup();
          });
      } else {
        this.tost.error('Enter valid Data', 'Invalid');
      }
    }
  }

  closePopup() {
    this.ref.close();
  }

  loadCategories() {
    this.masterService.getAllcategories().subscribe((response) => {
      this.categoryList = response;
    });
  }

  onEdit(id: number) {
    this.masterService
      .editFoodItem(id, this.addItemForm.value)
      .subscribe((response) => {
        if (response.status === true) {
          this.tost.success('Updated', 'Successfully update food Item');
          this.closePopup();
        } else {
          this.tost.error(
            'Something Wrong',
            'Invalid Data or data Already Exist'
          );
        }
      });
  }

  setPopupdata(id: number) {
    this.masterService.getItem(id).subscribe((data) => {
      this.editData = data;
      this.addItemForm.patchValue({
        categoryId: this.editData.categoryId,
        itemName: this.editData.itemName,
        itemPrice: this.editData.itemPrice,
      });
    });
  }
  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.addItemForm.patchValue(this.selectedFile);
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
