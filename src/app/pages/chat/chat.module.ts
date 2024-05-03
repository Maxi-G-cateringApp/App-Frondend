import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatLayoutComponent } from '../../layouts/chat-layout/chat-layout.component';
import { ChatListComponent } from './chat-list/chat-list.component';


@NgModule({
  declarations: [
    ChatComponent,ChatLayoutComponent, ChatListComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ChatModule { }
