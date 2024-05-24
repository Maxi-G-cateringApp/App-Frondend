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
import { Observable } from 'rxjs';
import { getErrorMessage } from '../../../../shared/store/shared.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
const phonePattern = /^\d{10}$/;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  
  employeeForm!: FormGroup;
  showErrorMessage!: Observable<string>;

  constructor(
    private masterService: MasterService,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private tost: ToastrService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.employeeForm = this.fb.group({
      emp_name: ['', [Validators.required, this.whiteSpaceValidator]],
      expertise: ['', [Validators.required, this.whiteSpaceValidator]],
      email: ['',[Validators.required,Validators.email,this.whiteSpaceValidator]],
      phoneNumber:['',[Validators.required,Validators.pattern(phonePattern)]]
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
        email:this.employeeForm.value.email,
        phoneNumber:this.employeeForm.value.phoneNumber
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
