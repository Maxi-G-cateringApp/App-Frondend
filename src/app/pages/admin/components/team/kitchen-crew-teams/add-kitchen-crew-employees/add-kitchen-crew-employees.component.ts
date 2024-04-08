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

@Component({
  selector: 'app-add-kitchen-crew-employees',
  templateUrl: './add-kitchen-crew-employees.component.html',
  styleUrl: './add-kitchen-crew-employees.component.css',
})
export class AddKitchenCrewEmployeesComponent implements OnInit {
  kitchenCrewTeam!: TeamModel[];
  kitchenCrewEmployeeForm!: FormGroup;

  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddKitchenCrewEmployeesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadKitchenCrewTeams();

    this.kitchenCrewEmployeeForm = this.fb.group({
      kitchenCrewTeamId: ['', Validators.required],
      kitchenCrewEmpName: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  onAddKitchenCrewEmployees() {
    if (this.kitchenCrewEmployeeForm.valid) {
      const data: KitchenCrewEmpl = {
        kitchenCrewTeamId: this.kitchenCrewEmployeeForm.value.kitchenCrewTeamId,
        kitchenCrewEmpName:
          this.kitchenCrewEmployeeForm.value.kitchenCrewEmpName,
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

  closePopup() {
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
