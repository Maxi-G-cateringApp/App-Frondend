import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { getUser } from '../../../auth/state/auth.selector';
import { MasterService } from '../../../../core/services/master.service';
import { User } from '../../../auth/models/user.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  user!: any;
  admin!: User;
  roomName?: string;
  newMessage: string = "";
  chatMessages: {
    sender: string;
    content: string;
    imageUrl?: string;
    timestamp: string;
    seen: boolean;
  }[] = [];
  chatRoomName!: string;
  file: File | null = null;
  private newMessageSubscription: Subscription | undefined;
  showEmojiPicker = false;
  unreadMessages: number = 0;
  unreadMessagesCount = 0;
  sets = [
    "native",
    "google",
    "twitter",
    "facebook",
    "emojione",
    "apple",
    "messenger",
  ];
  set: "google" | "twitter" | "facebook" | "apple" = "twitter";
  showChatIndicator = false;
  imageSent: boolean = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>,
    private masterService: MasterService,
    private dialogue: MatDialog
  ) {}

  ngOnInit(): void {
    this.masterService.getUserByRole().subscribe({
      next: (data) => {
        this.admin = data;
        this.store.select(getUser).subscribe((data) => {
          if (data) {
            this.user = data;
            const chatRoomName = this.chatService.generateChatroomName(
              this.user.id,
              this.admin.id
            );
            this.chatService
              .getMessagesBetweenUserAndAdmin(chatRoomName)
              .subscribe((data) => {
                this.chatMessages = data.map((msg) => ({
                  sender: msg.senderId,
                  content: msg.content,
                  timestamp: msg.t_stamp,
                  seen: msg.seen,
                }));

                data.forEach((msg) => {
                  if (!msg.seen) {
                    this.chatService.markMessageAsSeen(msg.id);
                  }
                });
              });
            this.chatService.initConectionSocket(chatRoomName);
            this.lisenerMessage();
          }
        });
      },
    });
  }

  sendMsg() {
    if (this.newMessage.trim() || (this.file && this.admin && this.user)) {
      const content = this.newMessage.trim();
      const senderId = this.user.id;
      const recipientId = this.admin.id;
      const chatRoomName = this.chatService.generateChatroomName(
        senderId,
        recipientId
      );
      const message: any = { senderId, chatRoomName };
      if (this.newMessage.trim()) {
        message.content = this.newMessage.trim();
      }
      if (this.file) {
        this.imageSent = true;
        const formData = new FormData();
        formData.append("file", this.file);
        this.chatService.sentImage(formData).subscribe((res: any) => {
          message.content = res.imageUrl;
          this.file = null;
          this.imageSent = false;
          this.sentMessage(message);
        });
      } else {
        this.sentMessage(message);
      }
      this.newMessage = "";
    }
  }

  sentMessage(message: any) {
    this.chatService.sentPrivateMessage(message);
    this.chatMessages.push({
      sender: message.senderId,
      content: message.content,
      timestamp: "",
      seen: false,
    });
    this.isImageUrl(message.content);
  }

  lisenerMessage() {
    this.newMessageSubscription = this.chatService.message$.subscribe(
      (message) => {
        const receivedMessage = JSON.parse(message);
        if (receivedMessage.senderId !== this.user.id) {
          this.chatMessages.push({
            sender: receivedMessage.senderId,
            content: receivedMessage.content,
            timestamp: receivedMessage.timestamp,
            seen: receivedMessage.seen,
          });
          this.chatService.markMessageAsSeen(receivedMessage.id);
          this.unreadMessages++;
        }
      }
    );
  }

  addEmoji(event: any) {
    const { newMessage } = this;
    const message = `${newMessage}${event.emoji.native}`;
    this.newMessage = message;
    this.showEmojiPicker = false;
  }

  ngOnDestroy(): void {
    if (this.newMessageSubscription) {
      this.newMessageSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.imageSent = true;
    this.sendMsg()

    
  }

  markAllMessagesAsRead() {
    this.unreadMessages = 0;
  }

  isImageUrl(content: string): boolean {
    return content.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
}
}
