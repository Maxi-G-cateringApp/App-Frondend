import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { AuthenticatedUser } from '../../../auth/models/authUser.model';
import { Observable, Subscription } from 'rxjs';
import { getEmailFromState, getUser, getuserId } from '../../../auth/state/auth.selector';
import { getErrorMessage } from '../../../../shared/store/shared.selector';
import { User } from '../../../auth/models/user.model';
import { updateUser } from '../../../auth/state/auth.action';
import { UpdateUser } from '../../models/update-user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user$: Subscription | undefined;
  user!: AuthenticatedUser | null;
  email!: string | undefined;
  userId!: any;
  formField: boolean = false;
  changeProfileBtn: boolean = true;
  selectedFile!: File;
  uploadProfilePic!: FormGroup;
  profilePictureUrl!: string;
  userName: string|undefined;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('profileForm') profileForm: any;
  showErrorMessage!: Observable<string>;
  updateForm!: FormGroup;




  
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private masterService: MasterService,
  ) {


   
  }

  ngOnInit(): void {

    // this.updateForm = this.fb.group({
    //   username: [this.user?.username,Validators.required],
    //   phonenumber: [this.user?.phonenumber,Validators.required]
    // })
    this.showErrorMessage = this.store.select(getErrorMessage);


    this.store.select(getEmailFromState).subscribe((data) => {
      this.email = data;
    });
    this.store.select(getuserId).subscribe((data) => {      
      this.userId = data;
    
    });
    this.store.select(getUser).subscribe((data) => {
      this.user = data;
      console.log(this.user?.username);
      
      
    });
    this.loadProfilePicture();

   
    
    this.uploadProfilePic = this.fb.group({
      file: [null],
    });
  }



  changeProfilePicClicked() {
    this.formField = true;
    this.changeProfileBtn = false;
  }
 

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadProfilePic.patchValue(this.selectedFile);
    console.log(this.selectedFile);
  }

  submitProPic() {
    if (this.userId) {
      console.log(this.userId,' ',this.selectedFile);
      
      this.masterService
        .changeProfilePicture(this.selectedFile, this.userId)
        .subscribe((response) => {
          this.loadProfilePicture();
          this.formField = false;
          this.changeProfileBtn = true;
        });
    } else {
      console.error;
    }
  }

  loadProfilePicture() {
    this.masterService.getUserImage(this.userId).subscribe((data: Blob) => {      
      if (data.size !== 0) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePictureUrl = reader.result as string;                   
        };
        reader.readAsDataURL(data);
      } else {
        this.profilePictureUrl = "/assets/icons/Profile-PNG-File.png";
      }
    });
    (error: any) => {
      console.error('Error fetching profile image:', error);
    };
  }

  // updateUser(){
  //   if(this.updateForm.valid){
  //     const user: UpdateUser = {
  //       id: this.user?.userId as string,
  //       name: this.updateForm.value.username,
  //       phoneNumber: this.updateForm.value.phonenumber,
  //     }
  //     console.log(typeof(this.userId));
  //     this.store.dispatch(updateUser({ user }))
  //   }
  // }

}
