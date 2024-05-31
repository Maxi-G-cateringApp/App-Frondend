import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { Observable, Subscription } from 'rxjs';
import {
  getEmailFromState,
  getuserId,
} from '../../../auth/state/auth.selector';
import { getErrorMessage } from '../../../../shared/store/shared.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  user$: Subscription | undefined;
  user: any = {};
  email!: string | undefined;
  userId!: any;
  formField: boolean = false;
  changeProfileBtn: boolean = true;
  selectedImage!: File;
  uploadProfilePic!: FormGroup;
  profilePictureUrl!: string;
  userName: string | undefined;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('profileForm') profileForm: any;
  showErrorMessage!: Observable<string>;
  updateForm!: FormGroup;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.store.select(getEmailFromState).subscribe((data) => {
      this.email = data;
    });
    this.store.select(getuserId).subscribe((data) => {
      this.userId = data;
    });
    this.getUserById();

    this.uploadProfilePic = this.fb.group({
      file: [null],
    });
  }

  changeProfilePicClicked() {
    this.formField = true;
    this.changeProfileBtn = false;
  }

  handleFileChange(event: any) {
    
    this.selectedImage = event.target.files[0];
    this.uploadProfilePic.patchValue(this.selectedImage);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
    this.formField = true;
  }


  submitProPic() {
    if (this.userId) {
      console.log(this.userId, ' ', this.selectedImage);

      this.masterService
        .changeProfilePicture(this.selectedImage, this.userId)
        .subscribe((response) => {
          this.getUserById()
          this.formField = false;
          this.changeProfileBtn = true;
        });
    } else {
      console.error;
    }
  }


  getUserById() {
    this.masterService.getUserById(this.userId).subscribe((response) => {
      this.user = response;
    
    });
  }
}
