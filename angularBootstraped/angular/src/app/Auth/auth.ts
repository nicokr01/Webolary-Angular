import { CookieService } from "ngx-cookie-service";
import { User } from "../User/User";
import CryptoJS from 'crypto-js';


export class Auth{
    protected username:string = "";
    protected dataLoaded:boolean = false;
    private user:User = new User("","",-2,"");

    constructor(protected cookieService:CookieService){}

    async auth(){
        if(!this.cookieService.check("username")){
            location.href = "/login";
        }
        else{
          const url = 'https://webolary.com/API/?checkCookie=&value='+this.cookieService.get("username");
          // console.log(url);
          await fetch(url)
          .then(response => response.json())
          .then(data => {
              if(data.check){
                this.dataLoaded = true;
                this.username = this.cookieService.get("username").split("|")[0];

                this.user.update(data.username,data.eMail,data.access,this.cookieService.get("username"));
                this.user.points = data.points;

                console.log(this.user);
                
                const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
                const value =  JSON.stringify(this.user);
                const encryptedData = CryptoJS.AES.encrypt(value, token).toString();
                sessionStorage.setItem("User", encryptedData);
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