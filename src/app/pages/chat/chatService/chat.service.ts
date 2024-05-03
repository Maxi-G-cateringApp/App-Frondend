import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat.model';
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
  private messageSubject2: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);


  constructor(private http: HttpClient) {}

  initConectionSocket(chatRoomId: string): void {
    if(this.stompClient && this.stompClient.connected){
      this.disconnect();
    }
    this.currentRoomId = chatRoomId;
    const url = '//localhost:8080/ws';
    // const sockJs = () => new SockJS();
    // this.stompClient = Stomp.over(sockJs());
    const socket = new SockJS(url)
    this.stompClient = Stomp.over(socket)

    const chatRoomTopic = `/topic/messages/${chatRoomId}`;
    this.stompClient.connect({},
      (frame: any) => {
        console.log('WebSocket connected:', frame);
        this.stompClient.subscribe(chatRoomTopic, (message: any) => {
          console.log('inside subscribe ------->');
          // const messageContent = JSON.parse(message.body)
          // const currentMessage = this.messageSubject2.getValue()
          // currentMessage.push(messageContent)
          // this.messageSubject.next(message);
          // console.log(currentMessage);
          
          this.showMessage(message.body);
        });
      },
      (error: any) => {
        console.error('WebSocket error:', error);
        this.reconnect()
      }
    );
  }

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }

  disconnect(){
    if(this.stompClient && this.stompClient.connected){
      this.stompClient.disconnect(()=>{
        console.log('Disconnected');
      });
    }
  }


  reconnect(){
    if(this.currentRoomId){
      console.log("Reconnecting...");
      setTimeout(()=>{
        this.initConectionSocket(this.currentRoomId);
      },5000);
    }
  }
  sentPrivateMessage(
    senderId: string,
    chatRoomName: string,
    content: string
  ) {
    if (this.stompClient && this.stompClient.connected) {
      const message = {
        senderId,
        chatRoomName,
        content,
      };
      this.stompClient.send('/app/send-message', {}, JSON.stringify(message));
    } else {
      console.error('WebSocket is not initialized.');
    }
  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }


  getMessagesBetweenUserAndAdmin(
    chatRoomName: string): Observable<ChatMessage[]> {
    return this.http.post<ChatMessage[]>(`/get-messages?chatRoomName=${chatRoomName}`,null);
  }
  getChatRooms(): Observable<any[]> {
    return this.http.get<any[]>('/chats');
  }


  generateChatroomName(senderId: string, recipientId: string ) {
    let names = [senderId, recipientId].sort();
    return names[0]+"_"+names[1];
}








  // getUserChatRoomId(userId: string, adminId: string): Observable<string> {
  //   return this.http.get<string>(`/get-chat-room-id?userId=${userId}&adminId=${adminId}`);
  // }

  // joinRoom(roomId: string){

  //   console.log(roomId,' room id from method');

  //   this.stompClient.connect({},()=>{
  //     this.stompClient.subscribe(`/topic/${roomId}`,(messages: any)=> {
  //       const messageContent = JSON.parse(messages.body)
  //       const currentMessage = this.messageSubject.getValue();
  //       currentMessage.push(messageContent)
  //       this.messageSubject.next(currentMessage);

  //     })
  //   })
  // }

  // sentMessage(roomId: string,ChatMessage: ChatMessage){
  //   this.stompClient.send(`/app/chat/${roomId}`,{},JSON.stringify(ChatMessage))

  // }

  // getMessageSubject(){
  //   return this.messageSubject.asObservable();
  // }
}
