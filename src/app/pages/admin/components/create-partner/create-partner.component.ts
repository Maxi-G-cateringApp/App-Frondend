import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Partner } from '../../models/partner.model';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

const phonePattern = /^\d{10}$/;
@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrl: './create-partner.component.css'
})
export class CreatePartnerComponent implements OnInit{

  createPartnerForm!: FormGroup;

  constructor(private fb: FormBuilder,private masterService: MasterService,private tost: ToastrService, private ref: MatDialogRef<CreatePartnerComponent>){}
  ngOnInit(): void {
    this.createPartnerForm = this.fb.group({
      userName: ['', [Validators.required, this.whiteSpaceValidator]],
      phoneNumber: ['',[Validators.required, Validators.pattern(phonePattern)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  onCreatePartner(){
    if(this.createPartnerForm.valid){
      const partner: Partner = {
        userName: this.createPartnerForm.value.userName,
        phoneNumber: this.createPartnerForm.value.phoneNumber,
        email: this.createPartnerForm.value.email,
        password:this.createPartnerForm.value.password
      }
      this.masterService.createPartner(partner).subscribe((response)=>{
        this.closePopUp();
        this.tost.success('Added','Partner added success')
      })

    }else{
      this.tost.error('Invalid','Enter valid Data')
    }

  }


  closePopUp(){
    this.ref.close()
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

}
