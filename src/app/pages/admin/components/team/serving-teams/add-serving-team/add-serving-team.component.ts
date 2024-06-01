import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../../../core/services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-serving-team',
  templateUrl: './add-serving-team.component.html',
  styleUrl: './add-serving-team.component.css',
})
export class AddServingTeamComponent implements OnInit {
  servingTeamForm!: FormGroup;

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddServingTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.servingTeamForm = this.fb.group({
      teamName: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  onAddServingTeam() {
    if (this.servingTeamForm.valid) {
      this.masterService
        .addServingTeam(this.servingTeamForm.value)
        .subscribe((response) => {
          this.closePopup();
        });
    } else {
      console.error('Data not valid');
    }
  }

  closePopup() {
    this.ref.close();
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
