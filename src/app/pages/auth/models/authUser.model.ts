export class AuthenticatedUser {
  constructor(
    private id: string,
    private username: string,
    private token: string,
    private role: string,
    private email: string,
    private phoneNumber: string
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
  
  public get userName(): string {
    return this.username;
  }
}
