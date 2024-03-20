import { CookieService } from "ngx-cookie-service";

export class Auth{
    protected username:string = "";
    protected dataLoaded:boolean = false;
    constructor(protected cookieService:CookieService){}

    async auth(){
        if(!this.cookieService.check("username")){
            location.href = "/login";
        }
        else{
          const url = 'https://webolary.com/API/?checkCookie=&value='+this.cookieService.get("username");
          await fetch(url)
          .then(response => response.json())
          .then(data => {
              if(data.check){
                this.dataLoaded = true;
                this.username = this.cookieService.get("username").split("|")[0];
              }
              else{
                this.cookieService.delete("username");
                location.href = "/banned"; 
              }
          })
          .catch(error => {
            console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
          });
        }
      }
}