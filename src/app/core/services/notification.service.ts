import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: any = null;
  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable();

  constructor(private http: HttpClient) {}

  connect(roomname: string) {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({},  () => {
     this.stompClient.subscribe('/notification', function (notification: any) {
          const message = JSON.parse(notification.body).message;
          console.log("Received notification: ", message);
      });
  });
  }

  showNotification(notification: string): void {
    this.notificationSubject.next(notification);
  }

  // getNotification(roomname: string):Observable<any[]>{
  //   return this.http.post<any[]>(`/get-nitification?roomname=${roomname}`,null)

  // }
}
