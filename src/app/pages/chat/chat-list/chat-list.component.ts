import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../core/services/master.service';
import { User } from '../../auth/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/app.state';
import { getUser } from '../../auth/state/auth.selector';
import { ChatService } from '../chatService/chat.service';
import { ChatMessage } from '../models/chat.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  admin: any;
  chatRoom?: any[];
  // chatMessages?: ChatMessage[] = [];
  chatMessages: { sender: string; content: string; timestamp: string }[] = [];
  newMessage: string = '';
  selectedChatRoom?: any;
  userChatRoomId!: any;

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe((data) => {
      this.admin = data;
    });
    this.chatService.getChatRooms().subscribe((data) => {
      this.chatRoom = data;
      console.log(this.chatRoom,' chat room');
      
    });
    this.lisenerMessage()

    // this.chatService.message$.subscribe((msg) => {
    //   const receivedMsg = JSON.parse(msg);
    //   if (
    //     this.selectedChatRoom &&
    //     receivedMsg.chatRoomName === this.selectedChatRoom.id
    //   ) {
    //     this.chatMessages.push(receivedMsg);
    //   } else {
    //     console.error('error');
    //   }
    // });
  }

  lisenerMessage(){

    this.chatService.message$.subscribe((message) => {
      console.log('Received message:', message);

      
      const receivedMessage = JSON.parse(message);
      console.log(receivedMessage,' receivedMessage in admin side');
      
      if (receivedMessage.senderId === this.selectedChatRoom.user.id) {
        console.log('Processed message in admin side:', receivedMessage);                
        this.chatMessages.push({
          sender: receivedMessage.senderId,
          content: receivedMessage.content,
          timestamp: receivedMessage.timestamp,
        });
      }else{
        console.log('chatrooms not eqal');
        
      }
    });
  }



  selectChatRoom(chat: any) {
    this.selectedChatRoom = chat;
    console.log(this.selectedChatRoom);
    

    this.chatService.initConectionSocket(this.selectedChatRoom.chatRoomName);
  
    this.chatService
      .getMessagesBetweenUserAndAdmin(this.selectedChatRoom.chatRoomName)
      .subscribe((data) => {
        this.chatMessages = data.map((msg) => ({
          // ms_id: msg.ms_id,
          content: msg.content,
          sender: msg.senderId,
          timestamp: msg.t_stamp,
        }));
      });

     
  }
  

  sendMsg() {
    if (this.newMessage.trim()) {
      const content = this.newMessage.trim();
      const senderId = this.admin.id;
      const recipientId = this.selectedChatRoom.user.id
      // const chatRoomName = `${recipientId}_${senderId}`;
      const chatRoomName = this.chatService.generateChatroomName(senderId, recipientId)


      this.chatService.sentPrivateMessage(
        senderId,
        chatRoomName,
        content
      );
      this.chatMessages.push({
        sender: senderId,
        content,
        timestamp: '',
      });
      this.newMessage = '';
    }
  }



  getRecipientId (userId: string)
  {
    let recId:string;
    if (this.selectedChatRoom.participant1 !== userId ) {
      recId = this.selectedChatRoom.participant1;
    } else {
      recId = this.selectedChatRoom.participant2;
    }
    return recId
  }
}
