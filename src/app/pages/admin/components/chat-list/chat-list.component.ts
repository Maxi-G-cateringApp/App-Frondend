import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getUser } from '../../../auth/state/auth.selector';
import { ChatService } from '../../../../core/services/chat.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ViewImageComponent } from '../../../user/components/chat/view-image/view-image.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit, OnDestroy {
  admin: any;
  chatRoom?: any[];
  chatMessages: {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    seen: boolean;
  }[] = [];
  file: File | null = null;
  newMessage: string = "";
  selectedChatRoom?: any;
  userChatRoomId!: any;
  private newMessageSubscription?: Subscription;
  showEmojiPicker = false;
  imageSent: boolean = false;
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

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>,
    private dialog: MatDialog,
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
    this.newMessageSubscription = this.chatService.message$.subscribe(
      (message) => {
        const receivedMessage = JSON.parse(message)
         if (receivedMessage.senderId === this.selectedChatRoom.user.id) {

          this.chatMessages.push({
            id: receivedMessage.id,
            sender: receivedMessage.senderId,
            content: receivedMessage.content,
            timestamp: receivedMessage.timestamp,
            seen: receivedMessage.seen,
          });
          this.chatService.markMessageAsSeen(receivedMessage.id);
        } else {
          console.log("chatrooms not eqal");
        }
      }
    );
  }

  selectChatRoom(chat: any) {
    this.selectedChatRoom = chat;
    this.chatService.initConectionSocket(this.selectedChatRoom.chatRoomName);
    this.chatService
      .getMessagesBetweenUserAndAdmin(this.selectedChatRoom.chatRoomName)
      .subscribe((data) => {
        this.chatMessages = data.map((msg) => ({
          id: msg.id,
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
  sentMessage(message: any) {
    this.chatService.sentPrivateMessage(message);
    this.chatMessages.push({
      id: message.id,
      sender: message.senderId,
      content: message.content,
      timestamp: "",
      seen: false,
    });
    this.isImageUrl(message.content);
  }

  sendMsg() {
    if (this.newMessage.trim() || this.file) {
      const content = this.newMessage.trim();
      const senderId = this.admin.id;
      const recipientId = this.selectedChatRoom.user.id;
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
    if (this.newMessageSubscription) {
      this.newMessageSubscription.unsubscribe();
    }
  }

  isImageUrl(content: string): boolean {
    return content.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.imageSent = true;
    this.sendMsg()
  }
  viewImage(id: number) {
    this.openImageViewPopup(id);
  }

  openImageViewPopup(id: number) {
    this.dialog.open(ViewImageComponent, {
      width: "60%",
      height: "60%",
      data: {
        id: id,
      },
    });
  }
}
