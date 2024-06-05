import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '../../../../../core/services/chat.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.css'
})
export class ViewImageComponent {

  inputData: any;
  url!: string;
  content!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private chatService: ChatService){}

  ngOnInit(): void {
      this.inputData = this.data;
      console.log(this.inputData.id);
      
      this. viewImage(this.inputData.id);
  }


  viewImage(id: number
  ){
    this.chatService.viewImage(id).subscribe((data)=>{
      console.log(data);
      this.url = data.imageUrl;
      window.open(this.url, '_blank');
    })
  }
 
}
