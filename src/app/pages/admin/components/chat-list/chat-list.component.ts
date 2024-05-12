import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getUser } from '../../../auth/state/auth.selector';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  admin: any;
  chatRoom?: any[];
  // chatMessages?: ChatMessage[] = [];
  chatMessages: { sender: string; content: string; timestamp: string; }[] = [];
  newMessage: string = '';
  selectedChatRoom?: any;
  userChatRoomId!: any;

  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set: 'google' | 'twitter' | 'facebook' | 'apple' = 'twitter';

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

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
    this.chatService.initConectionSocket(this.selectedChatRoom.chatRoomName);
    this.chatService
      .getMessagesBetweenUserAndAdmin(this.selectedChatRoom.chatRoomName)
      .subscribe((data) => {
        this.chatMessages = data.map((msg) => ({
          content: msg.content,
          sender: msg.senderId,
          timestamp: msg.t_stamp,
          type: msg.type
        }));
      });

     
  }
  

  sendMsg() {
    if (this.newMessage.trim()) {
      const content = this.newMessage.trim();
      const senderId = this.admin.id;
      const recipientId = this.selectedChatRoom.user.id
      const chatRoomName = this.chatService.generateChatroomName(senderId, recipientId)
      this.chatService.sentPrivateMessage(
        senderId,
        chatRoomName,
        content,
      
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

  addEmoji(event: any){
    const {newMessage} = this;
    const message = `${newMessage}${event.emoji.native}`;
    this.newMessage = message;
    this.showEmojiPicker = false;
    
    


  }
}
