export class AuthenticatedUser{

    constructor(private id: number, private username: string, private token: string,private role: string){}

    
    public get value() : string {
        return this.role
    }  
}
