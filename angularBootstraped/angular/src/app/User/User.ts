export class User {
    public username: string;
    public email: string;
    public access: number;
    public cookie: string;
    public points: string;
  
    public firstname: string;
    public lastname: string;
    public profilePicture: string;
  
    public emailLogin: boolean;
    public two_FA: boolean;
    public two_FA_method: string;
    public session_login: boolean;
  
    constructor(
      username: string,
      email: string,
      access: number,
      cookie: string,
      points: string = "",
      firstname: string = "",
      lastname: string = "",
      profilePicture: string = "",
      emailLogin:boolean,
      two_FA: boolean = false,
      two_FA_method: string = "",
      session_login: boolean = false
    ) {
      this.username = username;
      this.email = email;
      this.access = access;
      this.cookie = cookie;
      this.points = points;
      this.firstname = firstname;
      this.lastname = lastname;
      this.profilePicture = profilePicture;
      this.emailLogin = emailLogin;
      this.two_FA = two_FA;
      this.two_FA_method = two_FA_method;
      this.session_login = session_login;
    }
  
    // Methode zum Aktualisieren aller Attribute
    update(
      username: string,
      email: string,
      access: number,
      cookie: string,
      points: string = "",
      firstname: string = "",
      lastname: string = "",
      profilePicture: string = "",
      emailLogin:boolean,
      two_FA: boolean = false,
      two_FA_method: string = "",
      session_login: boolean = false
    ): void {
      this.username = username;
      this.email = email;
      this.access = access;
      this.cookie = cookie;
      this.points = points;
      this.firstname = firstname;
      this.lastname = lastname;
      this.profilePicture = profilePicture;
      this.emailLogin = emailLogin;
      this.two_FA = two_FA;
      this.two_FA_method = two_FA_method;
      this.session_login = session_login;
    }
  
    // Methode zum Aktualisieren der Attribute mit einem User-Objekt
    updateObject(user: User): void {
      this.username = user.username;
      this.email = user.email;
      this.access = user.access;
      this.cookie = user.cookie;
      this.points = user.points;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.profilePicture = user.profilePicture;
      this.emailLogin = user.emailLogin;
      this.two_FA = user.two_FA;
      this.two_FA_method = user.two_FA_method;
      this.session_login = user.session_login;
    }

    public convertAccessString():string{
        switch(this.access){
            case 1:
                return "@User"
                break;
            case 99:
                return "@CEO"
                break;
            case 100:
                return "@Admin"
                break;
            default:
                return "error";            
        }
    }
  }
  