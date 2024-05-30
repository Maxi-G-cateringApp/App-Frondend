export interface ChatMessage {
    
    id: number;
    seen: boolean;
    ms_id?: number; 
    content: string; 
    senderId: string; 
    recipientId?: string
    t_stamp: string;
    chatRoomId?:string
    type?: string;
    file?: File


    
}


