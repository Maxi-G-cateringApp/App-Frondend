import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-kitchen-crew-team',
  templateUrl: './add-kitchen-crew-team.component.html',
  styleUrl: './add-kitchen-crew-team.component.css'
})
export class AddKitchenCrewTeamComponent implements OnInit{

  kitchenCrewTeamForm!: FormGroup;
  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddKitchenCrewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

    ngOnInit(): void {
      this.kitchenCrewTeamForm = this.fb.group({
        teamName: ['',[Validators.required,this.whiteSpaceValidator]]
      })
    }






  onAddKitchenCrewTeam(){
    if(this.kitchenCrewTeamForm.valid){
    this.masterService.addlKitchenCrewTeam(this.kitchenCrewTeamForm.value).subscribe((response)=> {
      this.closePopup();
      
    })
  }else{
    console.error('data not valid')
  }

  }



  closePopup(){
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
