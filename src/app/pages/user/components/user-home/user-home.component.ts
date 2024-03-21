import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { AuthenticatedUser } from '../../../auth/models/authUser.model';
import { Observable, Subscription } from 'rxjs';
import {
  getEmailFromState,
  getuserId,
} from '../../../auth/state/auth.selector';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { getLoading } from '../../../../shared/store/shared.selector';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  

  // constructor(
  //   private store: Store<AppState>,
  //   private fb: FormBuilder,
  //   private masterService: MasterService
  // ) {}

  ngOnInit(): void {
  //   this.store.select(getEmailFromState).subscribe((data) => {
  //     console.log(data);
  //     this.email = data;
  //   });
  //   this.store.select(getuserId).subscribe((data) => {
  //     console.log(data);
  //     this.userId = data;
  //   });
    
  //   this.uploadProfilePic = this.fb.group({
  //     file: [null],
  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.store.dispatch(setLoadingSpinner({status: false}))
  // }
  }


 
}
