import { CookieService } from "ngx-cookie-service";
import { User } from "../User/User";
import CryptoJS from 'crypto-js';

export class Auth{
    protected username:string = "";
    protected dataLoaded:boolean = false;
    private user:User = new User("","",-1,"","","","","",false,false,"",false);
    private socket:any;

    constructor(protected cookieService:CookieService){}

    async auth(){
        if(!this.cookieService.check("username")){
            location.href = "/login";
        }
        else{
          const url = 'https://api.webolary.com/?checkCookie=&value='+this.cookieService.get("username");
          await fetch(url)
          .then(response => response.json())
          .then(data => {
              if(data.check){
                this.dataLoaded = true;
                this.username = this.cookieService.get("username").split("|")[0];

                this.user.update(data.username,data.eMail,data.access,this.cookieService.get("username"),data.points,data.firstname,data.lastname,data.profilePicture,data.emailLogin,data.twoFA,data.twoFAMethod,data.sessionLogin);
                
                const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
                const value =  JSON.stringify(this.user);
                const encryptedData = CryptoJS.AES.encrypt(value, token).toString();
                sessionStorage.setItem("User", encryptedData);

                // Establish Websocket connection
                this.socket = new WebSocket("ws://webolarylive.tech:3501");
                this.initSocketEvents();
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

      private initSocketEvents(){
        this.socket.onopen = () => {
          console.log('WebolaryLive services: connection established :)');
          // Send Webolary Live Services Authorization State
          this.socket.send('My token:'+this.cookieService.get("username"));
      };

      this.socket.onmessage = (event: MessageEvent) => {
          // Handle incoming messages here
      };

      this.socket.onclose = (event: CloseEvent) => {
          console.log('Webolary Live services connection closed:', event.reason);
          // You may want to attempt to reconnect here
      };

      this.socket.onerror = (error: Event) => {
          console.error('Webolary Live services connection error \n', error);
      };

      
      }
}