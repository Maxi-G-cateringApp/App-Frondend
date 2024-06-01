import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-pic',
  templateUrl: './add-item-pic.component.html',
  styleUrl: './add-item-pic.component.css',
})
export class AddItemPicComponent implements OnInit {
  foodItemForm!: FormGroup;
  selectedFile!: File;
  inputData: any;
  editId: number = 0;
  uploadComboPic!: FormGroup;

  constructor(
    private masterService: MasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddItemPicComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    this.uploadComboPic = new FormGroup({
      file: new FormControl(null),
    });
  }

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadComboPic.patchValue(this.selectedFile);
  }

  submitItemPic() {
    if (this.inputData.id) {
      this.masterService
        .updateItemPicture(this.selectedFile, this.inputData.id)
        .subscribe((response) => {
          this.closePopup();
        });
    }
  }

  closePopup() {
    this.ref.close();
  }
}
