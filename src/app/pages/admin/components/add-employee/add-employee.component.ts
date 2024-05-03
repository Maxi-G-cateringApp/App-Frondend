import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private tost: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      emp_name: ['', [Validators.required, this.whiteSpaceValidator]],
      expertise: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  closePopup() {
    this.ref.close();
  }

  onAddEmployee() {
    if (this.employeeForm.valid) {
      const employee = {
        emp_name: this.employeeForm.value.emp_name,
        expertise: this.employeeForm.value.expertise,
      };
      this.masterService.addEmployee(employee).subscribe((response) => {
        console.log(response);
        this.closePopup();
      });
    } else {
      this.tost.error('invalid', 'entervalid data');
    }
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
