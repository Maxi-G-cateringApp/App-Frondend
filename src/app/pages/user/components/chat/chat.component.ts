import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { getUser } from '../../../auth/state/auth.selector';
import { MasterService } from '../../../../core/services/master.service';
import { User } from '../../../auth/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  user!: any;
  admin!: User;
  roomName?: string;
  newMessage: string = '';
  chatMessages: {
    sender: string;
    content: string;
    timestamp: string;
    seen: boolean;
  }[] = [];
  chatRoomName!: string;
  file!: File;
  private newMessageSubscription: Subscription | undefined;
  showEmojiPicker = false;
  unreadMessages: number = 0;
  unreadMessagesCount = 0;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set: 'google' | 'twitter' | 'facebook' | 'apple' = 'twitter';
  showChatIndicator = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>,
    private masterService: MasterService
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
    if (this.newMessage.trim() && this.admin && this.user) {
      const content = this.newMessage.trim();
      const senderId = this.user.id;
      const recipientId = this.admin.id;
      const chatRoomName = this.chatService.generateChatroomName(
        senderId,
        recipientId
      );
      const message = { senderId, chatRoomName, content: content };

      this.chatService.sentPrivateMessage(message);
      this.chatMessages.push({
        sender: senderId,
        content: content,
        timestamp: '',
        seen: false,
      });
      this.newMessage = '';
    }
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
  }

  markAllMessagesAsRead() {
    this.unreadMessages = 0;
  }
}
