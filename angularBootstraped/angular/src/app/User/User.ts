export class User{
    public username:string;
    public email:string;
    public access:number;
    public cookie:string;
    
    constructor(username:string,email:string,access:number,cookie:string){
        this.username = username;
        this.email = email;
        this.access = access;
        this.cookie = cookie;
    }

    public update(username:string,email:string,access:number,cookie:string){
        this.username = username;
        this.email = email;
        this.access = access;
        this.cookie = cookie;
    }

    public updateObject(user:User){
        this.username = user.username;
        this.email = user.email;
        this.access = user.access;
        this.cookie = user.cookie;
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