import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../../core/services/master.service';
import { AddServingTeamComponent } from '../../serving-teams/add-serving-team/add-serving-team.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-decoration-team',
  templateUrl: './add-decoration-team.component.html',
  styleUrl: './add-decoration-team.component.css'
})
export class AddDecorationTeamComponent implements OnInit{



  decorationTeamForm!: FormGroup;
 


  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddDecorationTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

    ngOnInit(): void {
        this.decorationTeamForm = this.fb.group({
          teamName: ['',[Validators.required,this.whiteSpaceValidator]]
        })

       
    }


    onAddDecorationTeam(){
    if(this.decorationTeamForm.valid){
    this.masterService.addDecorationTeam(this.decorationTeamForm.value).subscribe((response)=> {
      console.log(response);
      this.closePopup();
      
    })
  }else{
    console.error('Data not valid')
  }

  }

  closePopup(){
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

}
