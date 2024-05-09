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
import { DecorImpl } from '../../teamModels/decorEmpl.model';
import { Employee } from '../../../../models/employee.model';

@Component({
  selector: 'app-add-decoration-employees',
  templateUrl: './add-decoration-employees.component.html',
  styleUrl: './add-decoration-employees.component.css',
})
export class AddDecorationEmployeesComponent implements OnInit {
  decorationEmployeeForm!: FormGroup;
  decorationTeams!: TeamModel[];
  employees!: Employee[];

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddDecorationEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadServingTeams();
    this.getEmployeesWithoutTeam();
    this.decorationEmployeeForm = this.fb.group({
      decorationTeamId: ['', Validators.required],
      emp: ['', Validators.required],
    });
  }

  loadServingTeams() {
    this.masterService.getAllDecorationTeams().subscribe((response) => {
      this.decorationTeams = response;
    });
  }

  getEmployeesWithoutTeam() {
    this.masterService.getEmployeesWithoutTeam().subscribe((data) => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  onAddDecorationEmployees() {
    if (this.decorationEmployeeForm.valid) {
      const data: DecorImpl = {
        decorationTeamId: this.decorationEmployeeForm.value.decorationTeamId,
        emp: this.decorationEmployeeForm.value.emp,
      };
      this.masterService.addDecorationEmpl(data).subscribe({
        next: (response) => {
          this.closePopup();
        },
      });
    } else {
      console.error('data not valid');
    }
  }

  closePopup() {
    this.ref.close();
  }

}
