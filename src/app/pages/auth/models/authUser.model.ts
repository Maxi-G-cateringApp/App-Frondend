export class AuthenticatedUser {
  constructor(
    private id: string,
    private name: string,
    private token: string,
    private role: string,
    private email: string,
    private phoneNumber: string,
  ) {}

  public get userRole(): string {
    return this.role;
  }

  public get userEmail(): string {
    return this.email;
  }

  public get userId(): string {
    return this.id;
  }
  
  public get username(): string {
    return this.name;
  }
  public get phonenumber(): string {
    return this.phoneNumber;
  }
  
}
