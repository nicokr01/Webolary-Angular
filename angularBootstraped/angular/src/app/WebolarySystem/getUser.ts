import { Injectable} from "@angular/core";
import { User } from "../User/User";
import { CookieService } from "ngx-cookie-service";
import CryptoJS from "crypto-js";


@Injectable({
  providedIn: 'root'
})


export class getUser{
    public static user:User = new User("","",-1,"","","","","",false,false,"",false);


    public static get():User{
        const encryptedValue = sessionStorage.getItem("User");
        if (encryptedValue) {
            const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
            const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
            this.user = JSON.parse(decryptedData);
        } else {
            this.user = new User("","",-1,"","","","","",false,false,"",false);
            console.log("sessionStorage is empty :(");
        }

        var reconstructedUserClass = new User("","",-1,"","","","","",false,false,"",false);
        reconstructedUserClass.updateObject(this.user);
        reconstructedUserClass.points = this.user.points;
        

        return reconstructedUserClass;
    }
}
