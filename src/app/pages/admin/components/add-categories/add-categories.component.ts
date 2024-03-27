import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit{

  constructor(private masterService: MasterService,private ref: MatDialogRef<AddCategoriesComponent>,){}

  ngOnInit(): void {
      this.addCategoryForm = new FormGroup({
        categoriesName: new FormControl('', Validators.required)
      })
  }

  addCategoryForm !: FormGroup;


  onaddCategory(){
    if(this.addCategoryForm.valid){
      this.masterService.addCategories(this.addCategoryForm.value).subscribe((response)=>{
        console.log(response);
        this.closePopup();
        
      })
    }

  }

  closePopup(){
    this.ref.close();

  }

}
