import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage } from '../../../../shared/store/shared.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { Categories } from '../../models/category.model';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css',
})
export class AddCategoriesComponent implements OnInit {
  showErrorMessage!: Observable<string>;
  addCategoryForm!: FormGroup;
  inputData: any;
  editData!: Categories;
  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddCategoriesComponent>,
    private tost: ToastrService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    if (this.inputData.isEdit) {
      this.setPopupdata(this.inputData.id);
    }
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.addCategoryForm = this.fb.group({
      categoriesName: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  setPopupdata(id: number) {
    this.masterService.getCategoryById(id).subscribe((data) => {
      this.editData = data;
      this.addCategoryForm.patchValue({
        id: this.editData.id,
        categoriesName: this.editData.categoriesName,
      });
    });
  }

  onEdit(id: number) {
    this.masterService
      .editCategory(id, this.addCategoryForm.value)
      .subscribe((response) => {
        if (response.status === true) {
          this.tost.success('Updated', 'Successfully update category');
          this.closePopup();
        } else {
          this.tost.error(
            'Something Wrong',
            'Invalid Data or data Already Exist'
          );
        }
      });
  }
  onaddCategory() {
    if (this.inputData.isEdit) {
      this.onEdit(this.inputData.id);
    } else {
      if (this.addCategoryForm.valid) {
        this.masterService
          .addCategories(this.addCategoryForm.value)
          .subscribe((response) => {
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

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
