import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { AppState } from '../../../../shared/app.state';
import { Store } from '@ngrx/store';
import { getUser } from '../../../auth/state/auth.selector';
import { MasterService } from '../../../../core/services/master.service';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  user!: any;
  admin!: User;
  roomName?: string;
  newMessage: string = '';
  chatMessages: { sender: string; content: string; timestamp: string;}[] = [];
  currentDate: any = Date.now();
  chatRoomName!: string;
  messageList: any[] = [];
  showEmojiPicker = false;
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

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
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
                  type: msg.type
                }));
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

      this.chatService.sentPrivateMessage(senderId, chatRoomName, content);
      this.chatMessages.push({
        sender: senderId,
        content: content,
        timestamp: '',
      });
      this.newMessage = '';
    }
  }


  lisenerMessage() {
    this.chatService.message$.subscribe((message) => {
      console.log('Received message:', message);

      const receivedMessage = JSON.parse(message);
      if (receivedMessage.senderId !== this.user.id) {
        console.log('Processed message in user side:', receivedMessage);
        this.chatMessages.push({
          sender: receivedMessage.senderId,
          content: receivedMessage.content,
          timestamp: receivedMessage.timestamp,
        });
      }
    });
  }

  addEmoji(event: any) {
    console.log(this.newMessage);
    const { newMessage } = this;
    console.log(newMessage);
    console.log(`${event.emoji.native}`);
    const message = `${newMessage}${event.emoji.native}`;
    this.newMessage = message;
    this.showEmojiPicker = false;
  }
}
