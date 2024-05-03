import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import TeamModel from '../../teamModels/team.model';
import { ServingEmpl } from '../../teamModels/servingEmpl.model';
import { Employee } from '../../../../models/employee.model';

@Component({
  selector: 'app-add-serving-employees',
  templateUrl: './add-serving-employees.component.html',
  styleUrl: './add-serving-employees.component.css',
})
export class AddServingEmployeesComponent implements OnInit {
  servingTeam!: TeamModel[];
  employees!: Employee[];
  servingEmployeeForm!: FormGroup;

  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddServingEmployeesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadServingTeams();
    this.getAllEmployees()

    this.servingEmployeeForm = this.fb.group({
      servingTeamId: ['', Validators.required],
      servingEmpName: ['', [Validators.required, this.whiteSpaceValidator]],
      servingEmpNameId:['',Validators.required]
    });
  }

  onAddServingEmployees() {
    if (this.servingEmployeeForm.valid) {
      const data: ServingEmpl = {
        servingTeamId: this.servingEmployeeForm.value.servingTeamId,
        servingEmpName: this.servingEmployeeForm.value.servingEmpName,
        servingEmpNameId: this.servingEmployeeForm.value.servingEmpNameId
      };
      this.masterService.addServingEmpl(data).subscribe({
        next: (response) => {
          this.closePopup();
        },
      });
    } else {
      console.error('Data not Valid');
    }
  }

  loadServingTeams() {
    this.masterService.getAllServingTeams().subscribe((response) => {
      this.servingTeam = response;
    });
  }


  getAllEmployees(){
    this.masterService.getAllEmployees().subscribe((data)=>{
      this.employees = data;
    })
  }


  closePopup() {
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
