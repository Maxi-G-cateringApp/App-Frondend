
export interface User {
    
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    file: string;
    partner?: boolean;
    imageUrl: string;
}   