import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'list',component: ChatListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
