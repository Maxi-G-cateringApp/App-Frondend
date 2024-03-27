import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit{

  addEventForm!: FormGroup;

  constructor(private masterService: MasterService,private ref: MatDialogRef<AddEventComponent>,){}

  ngOnInit(): void {
    this.addEventForm = new FormGroup({
      eventName: new FormControl('', Validators.required)
    })
}


  onaddEvent(){
    if(this.addEventForm.valid){
      console.log(this.addEventForm.value); 
      this.masterService.addEvent(this.addEventForm.value).subscribe((response)=>{
        console.log(response);
        this.closePopup();
      })
    }

  }

  closePopup(){
    this.ref.close();
  }

}
