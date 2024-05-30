import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getUser } from '../../../auth/state/auth.selector';
import { ChatService } from '../../../../core/services/chat.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit,OnDestroy {
  admin: any;
  chatRoom?: any[];
  chatMessages: {
    id?: number;
    sender: string;
    content: string;
    timestamp: string;
    seen: boolean;
  }[] = [];
  newMessage: string = '';
  selectedChatRoom?: any;
  userChatRoomId!: any;
  private newMessageSubscription?: Subscription;
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
    private ref: MatDialogRef<ChatListComponent>
  ) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe((data) => {
      this.admin = data;
    });
    this.chatService.getChatRooms().subscribe((data) => {
      this.chatRoom = data;
    });
    this.lisenerMessage();
  }

  lisenerMessage() {
    this.newMessageSubscription = this.chatService.message$.subscribe((message) => {
      const receivedMessage = JSON.parse(message);
      console.log(receivedMessage, 'receved message admin side');

      if (receivedMessage.senderId === this.selectedChatRoom.user.id) {
        console.log(receivedMessage.senderId,'sender,',this.selectedChatRoom.user.id,'user id');
        
        this.chatMessages.push({
          sender: receivedMessage.senderId,
          content: receivedMessage.content,
          timestamp: receivedMessage.timestamp,
          seen: receivedMessage.seen,
        });
        this.chatService.markMessageAsSeen(receivedMessage.id);
      } else {
        console.log('chatrooms not eqal');
      }
    });
  }

  selectChatRoom(chat: any) {
    this.selectedChatRoom = chat;
    this.chatService.initConectionSocket(this.selectedChatRoom.chatRoomName);
    this.chatService
      .getMessagesBetweenUserAndAdmin(this.selectedChatRoom.chatRoomName)
      .subscribe((data) => {
        this.chatMessages = data.map((msg) => ({
          content: msg.content,
          sender: msg.senderId,
          timestamp: msg.t_stamp,
          type: msg.type,
          seen: msg.seen,
        }));
        data.forEach((msg) => {
          if (!msg.seen) {
            this.chatService.markMessageAsSeen(msg.id);
          }
        });
      });
  }

  sendMsg() {
    if (this.newMessage.trim()) {
      const content = this.newMessage.trim();
      const senderId = this.admin.id;
      const recipientId = this.selectedChatRoom.user.id;
      const chatRoomName = this.chatService.generateChatroomName(
        senderId,
        recipientId
      );
      const message = {
        senderId,
        chatRoomName,
        content,
      };
      this.chatService.sentPrivateMessage(message);
      this.chatMessages.push({
        sender: senderId,
        content,
        timestamp: '',
        seen: false,
      });
      this.newMessage = '';
    }
  }

  getRecipientId(userId: string) {
    let recId: string;
    if (this.selectedChatRoom.participant1 !== userId) {
      recId = this.selectedChatRoom.participant1;
    } else {
      recId = this.selectedChatRoom.participant2;
    }
    return recId;
  }

  addEmoji(event: any) {
    const { newMessage } = this;
    const message = `${newMessage}${event.emoji.native}`;
    this.newMessage = message;
    this.showEmojiPicker = false;
  }

  closePopup() {
    this.ref.close();
  }

  ngOnDestroy(): void {
      if(this.newMessageSubscription){
        this.newMessageSubscription.unsubscribe()
      }
  }
}
