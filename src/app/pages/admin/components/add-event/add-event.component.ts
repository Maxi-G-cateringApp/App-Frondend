import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage } from '../../../../shared/store/shared.selector';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Events } from '../../models/event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit{

  addEventForm!: FormGroup;
  showErrorMessage!: Observable<string>;
  inputData: any;
  editData!: Events

  constructor(private masterService: MasterService,private ref: MatDialogRef<AddEventComponent>,private fb: FormBuilder,private tost: ToastrService,private store: Store<AppState>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.isEdit){
      this.setupPopupData(this.inputData.id);
    }
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.addEventForm = this.fb.group({
      eventName: ['', [Validators.required,this.whiteSpaceValidator]]
    })
}
setupPopupData(id:number){
  this.masterService.getEventById(id).subscribe((data)=>{
    this.editData = data;
    this.addEventForm.patchValue({
      eventName: data.eventName
    })
  })
}


  onaddEvent(){
   if(this.inputData.isEdit){
    this.editEvent(this.inputData.id)
   }else{
    if(this.addEventForm.valid){
      console.log(this.addEventForm.value); 
      this.masterService.addEvent(this.addEventForm.value).subscribe((response)=>{
        console.log(response);
        this.closePopup();
      })
    }else{
      this.tost.error('Enter valid Data','Invalid')
    }
  }

  }
  editEvent(id:number){
    this.masterService.editEvent(id,this.addEventForm.value).subscribe((res)=>{
      if(res.status === true){
        this.tost.success('update Event Successfully','updated')
        this.closePopup()
      }else{
        this.tost.error('Something Wrong or Event Exist','Something Went Wrong')
      }
    })
  }

  closePopup(){
    this.ref.close();
  }


  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
}

}
