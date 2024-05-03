import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import TeamModel from '../../teamModels/team.model';
import { DecorImpl } from '../../teamModels/decorEmpl.model';

@Component({
  selector: 'app-add-decoration-employees',
  templateUrl: './add-decoration-employees.component.html',
  styleUrl: './add-decoration-employees.component.css'
})
export class AddDecorationEmployeesComponent implements OnInit{

  decorationEmployeeForm!: FormGroup;
  decorationTeams!: TeamModel[];

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddDecorationEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.loadServingTeams();
      this.decorationEmployeeForm = this.fb.group({
        decorationTeamId: ['',Validators.required],
        decorationEmpName: ['',[Validators.required,this.whiteSpaceValidator]]
      })
  }

  loadServingTeams() {
    this.masterService.getAllDecorationTeams().subscribe((response) => {
      this.decorationTeams = response;
    });
  }

  onAddDecorationEmployees(){
    if(this.decorationEmployeeForm.valid){
    const data:DecorImpl = {
      decorationTeamId: this.decorationEmployeeForm.value.decorationTeamId,
      decorationEmpName: this.decorationEmployeeForm.value.decorationEmpName
    } 
    this.masterService.addDecorationEmpl(data).subscribe({next:(response)=>{
      this.closePopup();  
    }})
  }else {
    console.error("data not valid");
  }

  }


  closePopup() {
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}

