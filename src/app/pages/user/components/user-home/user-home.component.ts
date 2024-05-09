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
import { Feed } from '../../../admin/models/feed.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  

  userId!: string;
  feeds!: Feed[]
  profilePictureUrl!: string;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.getFeeds();
  
    this.store.select(getuserId).subscribe((data) => {
      if(data){
      this.userId = data;
      
      }
    });
  }


    getFeeds() {
    this.masterService.getAllFeeds().subscribe({
      next: (response) => {
        console.log(response,'  response');
        
        this.feeds = response; 
      },
    });
  }

 
}
