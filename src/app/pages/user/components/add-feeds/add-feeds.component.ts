import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import { MasterService } from '../../../../core/services/master.service';
import { Feed } from '../../../admin/models/feed.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-feeds',
  templateUrl: './add-feeds.component.html',
  styleUrl: './add-feeds.component.css',
})
export class AddFeedsComponent implements OnInit {
  feedForm!: FormGroup;
  selectedFile!: File;
  userId!: string;
  feeds!: Feed[];
  imageSrc!: any;

  constructor(
    private store: Store<AppState>,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.store.select(getuserId).subscribe((data) => {
      if (data) {
        this.userId = data;
        console.log(this.userId);
      }
    });
    this.getUserFeeds();
  }

  getUserFeeds() {
    this.masterService.getUserFeeds(this.userId).subscribe({
      next: (response) => {
        this.feeds = response;
        console.log(this.feeds.values);
      },
      error: (error) => {
        console.error('user id undefined', error);
      },
    });
  }

  onDeleteFeed(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.masterService.deleteFeed(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your post has been deleted.',
              icon: 'success',
            });
            this.getUserFeeds();
          },
          error: (error) => {
            console.error('Something wrong:', error);
          },
        });
      }
    });
  }
  
}
