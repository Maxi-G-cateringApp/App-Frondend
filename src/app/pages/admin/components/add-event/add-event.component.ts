import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage } from '../../../../shared/store/shared.selector';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit{

  addEventForm!: FormGroup;
  showErrorMessage!: Observable<string>;

  constructor(private masterService: MasterService,private ref: MatDialogRef<AddEventComponent>,private fb: FormBuilder,private tost: ToastrService,private store: Store<AppState>){}

  ngOnInit(): void {
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.addEventForm = this.fb.group({
      eventName: ['', [Validators.required,this.whiteSpaceValidator]]
    })
}


  onaddEvent(){
   
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

  closePopup(){
    this.ref.close();
  }


  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
}

}
