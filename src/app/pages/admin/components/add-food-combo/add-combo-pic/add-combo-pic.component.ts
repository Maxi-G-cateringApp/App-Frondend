import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-combo-pic',
  templateUrl: './add-combo-pic.component.html',
  styleUrl: './add-combo-pic.component.css'
})
export class AddComboPicComponent implements OnInit{

  foodComboForm!: FormGroup;
  selectedFile!: File;
  inputData: any;
  editId: number = 0;
  category!: string;
  uploadComboPic!: FormGroup;
  comboPictureUrls: { [key: number]: string } = {};

  constructor(private masterService: MasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddComboPicComponent>,

    ){}

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

  submitComboPic() {
    if (this.inputData.id) {
      this.masterService
        .updateComboPicture(this.selectedFile, this.inputData.id)
        .subscribe((response) => {
          this.loadComboPicture(this.inputData.id)
          this.closePopup();
          
        });
    }
  }

  loadComboPicture(imgId: number) {
    this.masterService.getComboImage(imgId).subscribe({
      next: (data: Blob) => {
        if (data.size !== 0) {
          const reader = new FileReader();
          reader.onload = () => {
            this.comboPictureUrls[imgId] = reader.result as string;
          };
          reader.readAsDataURL(data);
        } else {
          console.log('No picture data received');
        }
      },
      error: (error) => {
        console.error('Error fetching profile image:', error);
      },
    });
  }



  closePopup() {
    this.ref.close();
  }


}
