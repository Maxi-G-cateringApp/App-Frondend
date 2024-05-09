import { User } from "../../auth/models/user.model";

export interface Feed{
    id:number;
    content: string;
    user: User
    file?: File;
    imageUrl?: string;
    createdAt: Date;
}