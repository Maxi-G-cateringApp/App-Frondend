import { Component, OnInit } from '@angular/core';
import { ChatService } from './chatService/chat.service';
import { AppState } from '../../shared/app.state';
import { Store } from '@ngrx/store';
import { getUser, getuserId } from '../auth/state/auth.selector';
import { ChatMessage } from './models/chat.model';
import { MasterService } from '../../core/services/master.service';
import * as Stomp from 'stompjs';
import { FormControl } from '@angular/forms';
import SockJS from 'sockjs-client';
import { Observable, of } from 'rxjs';
import { User } from '../auth/models/user.model';

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
  chatMessages: { sender: string; content: string; timestamp: string }[] = [];
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
                  type: 'text',
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
        content,
        timestamp: '',
      });
      this.newMessage = '';
    }
  }
  sendImage(event: any) {
    const file = event.target.files[0];
    console.log(file,' fileeeeee');
    
    const senderId = this.user.id;
    const recipientId = this.admin.id;
    const chatRoomName = this.chatService.generateChatroomName(
      senderId,
      recipientId
    );
    const formData = new FormData();
    formData.append('file', file);
    formData.append('chatRoomName', chatRoomName);
    formData.append('senderId', senderId);
    formData.append('messageType', 'file');
    this.chatService.sentPrivateFileMessage(formData);
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
