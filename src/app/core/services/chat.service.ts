import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../../pages/user/models/chat.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: any = null;
  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();
  private currentRoomId!: string;


  // private unreadMessageCount = new BehaviorSubject<number>(0);
  // public unreadMessageCount$ = this.unreadMessageCount.asObservable()


  constructor(private http: HttpClient) {}

  initConectionSocket(chatRoomId: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.disconnect();
    }
    this.currentRoomId = chatRoomId;
    const url = '//api.maxigcatering.online/wss';
    // const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    const chatRoomTopic = `/topic/messages/${chatRoomId}`;
    this.stompClient.connect(
      {},
      (frame: any) => {
        this.stompClient.subscribe(chatRoomTopic, (message: any) => {
          this.showMessage(message.body);
        });
      },
      (error: any) => {
        console.error('WebSocket error:', error);
        this.reconnect();
      }
    );
  }

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
      });
    }
  }

  reconnect() {
    if (this.currentRoomId) {
      setTimeout(() => {
        this.initConectionSocket(this.currentRoomId);
      }, 5000);
    }
  }

  sentPrivateMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/send-message', {}, JSON.stringify(message));
    } else {
      console.error('WebSocket is not initialized.');
    }
  }

  markMessageAsSeen(messageId: number){
    if(this.stompClient && this.stompClient.connected){
      this.stompClient.send('/app/seen',{},JSON.stringify({ messageId}))
    }else{
      console.error('WebSocket is not initialized.');
    }
  }
  
  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  getMessagesBetweenUserAndAdmin(
    chatRoomName: string
  ): Observable<ChatMessage[]> {
    return this.http.post<ChatMessage[]>(
      `/get-messages?chatRoomName=${chatRoomName}`,
      null
    );
  }
  getChatRooms(): Observable<any[]> {
    return this.http.get<any[]>('/chats');
  }

  generateChatroomName(senderId: string, recipientId: string) {
    let names = [senderId, recipientId].sort();
    return names[0] + '_' + names[1];
  }

  //  private updateUnreadMessagesCount() {
  //   this.getChatRooms().subscribe(chatRooms => {
  //     let count = 0;
  //     chatRooms.forEach(chatRoom => {
  //       this.getMessagesBetweenUserAndAdmin(chatRoom.chatRoomName).subscribe(messages => {
  //         messages.forEach(msg => {
  //           if (!msg.seen) {
  //             count++;
  //           }
  //         });
  //         this.unreadMessageCount.next(count)
  //       });
  //     });
  //   });
  // }
  
}






