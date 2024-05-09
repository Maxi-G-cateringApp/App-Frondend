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
    private fb: FormBuilder,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.store.select(getuserId).subscribe((data) => {
      if (data) {
        this.userId = data;
        console.log(this.userId);
      }
    });

    this.feedForm = this.fb.group({
      content: ['', Validators.required],
      file: [null, Validators.required],
    });
    this.getUserFeeds();
  }

  postImage(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.feedForm.patchValue(this.selectedFile);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  addFeed() {
    const formData = new FormData();
    formData.append('content', this.feedForm.value.content);
    formData.append('userId', this.userId);
    formData.append('file', this.selectedFile);

    this.masterService.addFeed(formData).subscribe({
      next: (response) => {
        this.getUserFeeds();
        this.feedForm.reset();
        this.imageSrc = null;
      },
    });
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
