import { Component, Inject, OnInit } from '@angular/core';
import TeamModel from '../../teamModels/team.model';
import { MasterService } from '../../../../../../core/services/master.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KitchenCrewEmpl } from '../../teamModels/kitchenCrew.model';
import { Employee } from '../../../../models/employee.model';

@Component({
  selector: 'app-add-kitchen-crew-employees',
  templateUrl: './add-kitchen-crew-employees.component.html',
  styleUrl: './add-kitchen-crew-employees.component.css',
})
export class AddKitchenCrewEmployeesComponent implements OnInit {
  kitchenCrewTeam!: TeamModel[];
  kitchenCrewEmployeeForm!: FormGroup;
  employees!: Employee[];

  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddKitchenCrewEmployeesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadKitchenCrewTeams();
    this.getEmployeesWithoutTeam()

    this.kitchenCrewEmployeeForm = this.fb.group({
      kitchenCrewTeamId: ['', Validators.required],
      emp: ['',Validators.required]
    });
  }

  onAddKitchenCrewEmployees() {
    if (this.kitchenCrewEmployeeForm.valid) {
      const data: KitchenCrewEmpl = {
        kitchenCrewTeamId: this.kitchenCrewEmployeeForm.value.kitchenCrewTeamId,
        emp: this.kitchenCrewEmployeeForm.value.emp,
      };
      this.masterService.addlKitchenCrewEmpl(data).subscribe({
        next: (response) => {
          this.closePopup();
        },
      });
    } else {
      console.error('Data not valid');
    }
  }

  loadKitchenCrewTeams() {
    this.masterService.getAllKitchenCrewTeams().subscribe((response) => {
      this.kitchenCrewTeam = response;
    });
  }
  getEmployeesWithoutTeam(){
    this.masterService.getEmployeesWithoutTeam().subscribe((data)=>{
      this.employees = data;
      console.log(this.employees);
      
    })
  }

  closePopup() {
    this.ref.close();
  }


}
