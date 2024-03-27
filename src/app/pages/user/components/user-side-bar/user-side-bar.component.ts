import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { AuthenticatedUser } from '../../../auth/models/authUser.model';
import { Observable, Subscription } from 'rxjs';
import { getEmailFromState, getuserId } from '../../../auth/state/auth.selector';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrl: './user-side-bar.component.css'
})
export class UserSideBarComponent implements OnInit,AfterViewInit{

  showLoading!: Observable<boolean | undefined>;
  user$: Subscription | undefined;
  user!: AuthenticatedUser | null;
  email!: string | undefined;
  userId!: any;
  formField: boolean = false;
  changeProfileBtn: boolean = true;
  selectedFile!: File;
  uploadProfilePic!: FormGroup;
  profilePictureUrl!: string;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.store.select(getEmailFromState).subscribe((data) => {
      this.email = data;
    });
    this.store.select(getuserId).subscribe((data) => {
      this.userId = data;
    });
    this.loadProfilePicture();
    
    this.uploadProfilePic = this.fb.group({
      file: [null],
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(setLoadingSpinner({status: false}))
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

}
