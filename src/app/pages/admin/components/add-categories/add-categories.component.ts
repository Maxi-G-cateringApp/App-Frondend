import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css',
})
export class AddCategoriesComponent implements OnInit {
  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddCategoriesComponent>,
    private tost: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      categoriesName: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  addCategoryForm!: FormGroup;

  onaddCategory() {
    if (this.addCategoryForm.valid) {
      this.masterService
        .addCategories(this.addCategoryForm.value)
        .subscribe((response) => {
          console.log(response);
          this.closePopup();
        });
    }else{
      this.tost.error('Enter valid Data','Invalid')
      
    }
  }

  closePopup() {
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
