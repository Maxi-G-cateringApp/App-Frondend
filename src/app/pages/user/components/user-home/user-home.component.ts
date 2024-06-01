import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { Feed } from '../../../admin/models/feed.model';
import { User } from '../../../auth/models/user.model';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  admin!: any;
  userId!: string;
  feeds!: Feed[];
  profilePictureUrl!: string;
  feedForm!: FormGroup;
  selectedFile!: File;
  imageSrc!: any;
  user: User | null = null;
  chatRoomName!: string;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private masterService: MasterService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getFeeds();
    this.getUserByRole();

    this.store.select(getuserId).subscribe((data) => {
      if (data) {
        this.userId = data;
      }
    });
    this.feedForm = this.fb.group({
      content: ['', Validators.required],
      file: [null, Validators.required],
    });
    this.getUserById();
  }

  getUserByRole() {
    this.masterService.getUserByRole().subscribe((data) => {
      this.admin = data;
      this.chatRoomName = this.chatService.generateChatroomName(
        this.userId,
        this.admin.id
      );
      this.chatService.initConectionSocket(this.chatRoomName);
    });
  }

  getUserById() {
    this.masterService.getUserById(this.userId).subscribe((response) => {
      this.user = response;
    });
  }

  getFeeds() {
    this.masterService.getAllFeeds().subscribe({
      next: (response) => {
        this.feeds = response;
      },
    });
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
        this.getFeeds();
        this.feedForm.reset();
        this.imageSrc = null;
      },
    });
  }
}
