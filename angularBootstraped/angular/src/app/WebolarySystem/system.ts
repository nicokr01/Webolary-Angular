import { Injectable} from "@angular/core";
import { User } from "../User/User";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})


export class System{
    private user:any;
    public dictionary: { [key: string]: any } = {};
  
    constructor(public cookieService:CookieService, ){
      
      let dicJSON = localStorage.getItem('dictionary');

      if(this.dictionary != null && dicJSON != null){
        this.dictionary = JSON.parse(dicJSON);
      }
    }

    /* System Vocabulary Trainer <&> Dictionary actions */
    increaseCountCorrect(){
      var CountCorrect = localStorage.getItem("CountCorrect");
      if(CountCorrect !== null){
          var int = parseInt(CountCorrect);
          int++;
          localStorage.setItem("CountCorrect",""+int);
      }
      else{
        localStorage.setItem("CountCorrect","1");
      }
    }

    increaseCountWrong(){
      var CountWrong = localStorage.getItem("CountWrong");
      if(CountWrong !== null){
          var int = parseInt(CountWrong);
          int++;
          localStorage.setItem("CountWrong",""+int);
      }
      else{
        localStorage.setItem("CountWrong","1");
      }
    }

    getProgress():number {
      return Math.ceil((100*(this.getCountCorrect()+this.getCountWrong()))/this.getUnitSize());
    }

    getCountCorrect():number{
      var CountCorrect = localStorage.getItem("CountCorrect");
      if(CountCorrect !== null){
          return parseInt(CountCorrect);
      }
      return 0;
    }

    getCountCorrectPercent(){
      // if counts are not summarized 100% because if ceil error, reduce correct for summarize 100% !
      var value = Math.ceil((100*this.getCountCorrect())/(this.getCountCorrect()+this.getCountWrong()));
      
      if(value+this.getCountWrongPercent() != 100){
        value--;
      }

      return value;
    }

    getCountWrongPercent(){
      return Math.ceil((100*this.getCountWrong())/(this.getCountCorrect()+this.getCountWrong()));
    }

    getCountWrong():number{
      var CountWrong = localStorage.getItem("CountWrong");
      if(CountWrong !== null){
          return parseInt(CountWrong);
      }
      return 0;
    }

    setWrongCorrectNull(){
      /* Wrong -1 because on reload the system detects de vocabulary at (f) submit  as wrong,
       so the count is at 1 but should be null problem fixed with set to -1*/

      localStorage.setItem("CountWrong","-1");
      localStorage.setItem("CountCorrect","0");
    }

    getUnitSize(){
      var dictionaryJSON = localStorage.getItem("dictionary");
      if(dictionaryJSON !== null){
        var dictionary = JSON.parse(dictionaryJSON);

        return Object.keys(dictionary).length;
      }
      return 0;
    }

    checkDictionary(){
        if(!localStorage.getItem("dictionary") || localStorage.getItem("dictionary") == ""){
            return false;
        }
        else{
            return true;
        }
    }

    getRandomVocabulary(){
        if(!localStorage.getItem("dictionary") || localStorage.getItem("dictionary") == ""){
            return false;
        }

        if(localStorage.getItem("availableVocabularys")){
            var dictionaryAvilableJSON = localStorage.getItem("availableVocabularys");

            if(dictionaryAvilableJSON !== null){
                var dictionaryAvilable = JSON.parse(dictionaryAvilableJSON);
                const keys = Object.keys(dictionaryAvilable);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];

                if(keys.length == 0){
                    return "unit finished 😀";
                }

                var result = new Array();
                result[0] = randomKey;
                result[1] = dictionaryAvilable[randomKey];
                localStorage.setItem("availableVocabularys",JSON.stringify(dictionaryAvilable));

                return result;
            }
        }
        else{
            var dictionaryJSON = localStorage.getItem("dictionary");
            if (dictionaryJSON !== null) {
                var dictionary = JSON.parse(dictionaryJSON);
                var newAvailalbe = dictionary;
                const keys = Object.keys(dictionary);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];

                var result = new Array();
                result[0] = randomKey;
                result[1] = dictionary[randomKey];
                localStorage.setItem("availableVocabularys",JSON.stringify(newAvailalbe));
                localStorage.setItem("CountWrong","0");
                localStorage.setItem("CountCorrect","0");
                return result;
            }
        }
        
        return false;
    }

    /* !! The following info is only neccessary for add/Edit Pacges !! ==> IMPLEMENT THE METHOD IN YOUR OWN COMPONENT CLASS (ChangeReferenceDetection !)*/
    delteVocOfAvailableList(key:any){
      let dicJSON = localStorage.getItem("availableVocabularys")

      if(dicJSON !== null){
          let dic = JSON.parse(dicJSON);

          delete dic[key];

          localStorage.setItem("availableVocabularys",JSON.stringify(dic))
      }
    }

    practiceUnitAgain(){
        var dictionaryJSON = localStorage.getItem("dictionary");

        if(dictionaryJSON !== null){
            localStorage.setItem("availableVocabularys",dictionaryJSON);
        }
    }

    checkInput(input:any,correct:any){
        input = input.trim();
        correct = correct.trim();
  
        if(input == correct){
          return true;
        }
  
  
        var solutions = new Array();
  
        solutions.push(correct);
        solutions.push(correct.replace("sth.","something"));
        solutions.push(correct.replace("something","sth."));
        
  
        // check if word without "to" is correct !
        if (correct.substring(0, 2) == "to") {
          solutions.push(correct.substring(3));
          var correctWithout = correct.substring(3);
          solutions.push(correctWithout.replace("sth.","something"));
          solutions.push(correctWithout.replace("something","sth."));
        }
  
        if(solutions.includes(input)){
          return true;
        }
        else{
          return false;
        }
      }

      /*DO NOT USE THIS IN ANGULAR*/
      // getVocabularysAsTable(){
      //     let html = "";

      //     let dictionaryJSON = localStorage.getItem("dictionary");
      //     if(dictionaryJSON !== null){
      //       let dictionary = JSON.parse(dictionaryJSON);
      //       let count = 1;

      //       for( var key in dictionary){
      //         if(count%2 == 0){
      //           html+= "<tr><td class='px-12 py-8 text-2xl font-medium text-gray-700 whitespace-nowrap' style='border-right: 1px solid white;'><div class='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800' style='background-color: #5110ce;'><h2 class='text-3xl font-normal' style='color:white'>"+key+"</h2></div></td><td class='px-12 py-8 text-3xl font-medium text-white whitespace-nowrap' style='border-right: 1px solid white;'>"+dictionary[key]+"</td>  <td class='px-2 py-2 text-3xl whitespace-nowrap items-center'><div class='items-center gap-x-6 flex justify-center'><button class='text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none' (click)='this.deleteVocabularyFromDictionary(\""+key+"\");'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-11 h-11 mr-5'><path stroke-linecap='round' stroke-linejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' /></svg></button><button class='text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-11 h-11'><path stroke-linecap='round' stroke-linejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' /></svg></button></div></td></tr>";
      //         }
      //         else{
      //           html+= "<tr><td class='px-12 py-8 text-sm font-medium text-gray-700 whitespace-nowrap' style='border-right: 1px solid white;'><div class='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800' style='background-color: #5110ce;'><h2 class='text-3xl font-normal' style='color:white'>"+key+"</h2></div></td><td class='px-12 py-8 text-3xl font-medium text-white whitespace-nowrap' style='border-right: 1px solid white;'>"+dictionary[key]+"</td>  <td class='px-2 py-2 text-3xl whitespace-nowrap items-center'><div class='items-center gap-x-6 flex justify-center'><button class='text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none' (click)='this.deleteVocabularyFromDictionary(\""+key+"\");'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-11 h-11 mr-5'><path stroke-linecap='round' stroke-linejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' /></svg></button><button class='text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-11 h-11'><path stroke-linecap='round' stroke-linejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' /></svg></button></div></td></tr>"
      //         }
               
      //         count++;
      //       }
      //     }

      //     return html;
      // }

    /*  //// System Vocabulary Trainer <&> Dictionary actions */

    // Cycle progress circles
    circle_one(end:any){
        if(end == 0 || end > 100){return false;}
        let circularProgress = document.getElementById("c-p-1");
        let progressValue_e = document.getElementById("p-v-1");
        var progressValue:string = "";
        if(progressValue_e?.textContent?.toString != undefined){
          progressValue = progressValue_e?.textContent;
        }
        
        let start = parseInt(progressValue); 
        if(end != parseInt(progressValue)){
          let progressStartValue = start,   
        progressEndValue = end,    
        speed = 35;
        
        var betweenValue;
        var rotation;
        if(end > start){
            rotation = "-";
            betweenValue = end - start;
        }
        else{
          rotation = "+";
        }
      
      let progress = setInterval(() => {
        progressStartValue++;
      
        if(progressValue_e){
          progressValue_e.textContent = `${progressStartValue}%`;
        }
      
        if(circularProgress){
          circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #2B2F33 0deg)`;
        }
      
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }    
      }, speed);
        }

      return true;
    }
    
    
    circle_two(end:any){
      if(Number.isNaN(end)){return false};
      let circularProgress = document.getElementById("c-p-2");
      let progressValue_e = document.getElementById("p-v-2");
        var progressValue:string = "";
        if(progressValue_e?.textContent?.toString != undefined){
          progressValue = progressValue_e?.textContent;
        }
        
        let start = parseInt(progressValue); 
    
    if(end != start){
      let progressStartValue = start;    
      var progressEndValue = end,    
      speed = 5;
    
      if(end < progressStartValue){
      progressStartValue = 0;
      }
    
      let progress = setInterval(() => {
      progressStartValue++;
    
      if(progressValue_e){
        progressValue_e.textContent = `${progressStartValue}%`
      }
      if(circularProgress){
        circularProgress.style.background = `conic-gradient(green ${progressStartValue * 3.6}deg, #2B2F33 0deg)`
      }
        
      if(progressStartValue == progressEndValue){
          clearInterval(progress);
      }    
      }, speed);
    }
    return true;
    }
    
    
    circle_three(end:any){
      let circularProgress = document.getElementById("c-p-3");
      let progressValue_e = document.getElementById("p-v-3");
        var progressValue:string = "";
          if(progressValue_e?.textContent?.toString != undefined){
            progressValue = progressValue_e?.textContent;
          }
          
          let start = parseInt(progressValue); 
          if(end != start){
          let progressStartValue = start;    
          var progressEndValue = end,    
          speed = 5;
    
          if(end < progressStartValue){
            progressStartValue = 0;
          }
    
          let progress = setInterval(() => {
          progressStartValue++;
    
          if(progressValue_e){
            progressValue_e.textContent = `${progressStartValue}%`
          }
          
          if(circularProgress){
            circularProgress.style.background = `conic-gradient(red ${progressStartValue * 3.6}deg, #2B2F33 0deg)`
          }
    
          if(progressStartValue == progressEndValue){
              clearInterval(progress);
          }    
          }, speed); 
      }
    }
    // //// Cycle progress circle
    

    /*User class integration*/
    getUser(){
      const encryptedValue = sessionStorage.getItem("User");
      if (encryptedValue) {
          const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
          const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
          this.user = JSON.parse(decryptedData);
      } else {
          this.user = new User("","",-1,"","","","","",false,false,"",false);;
          console.log("sessionStorage is empty :(");
      }

      var reconstructedUserClass = new User("","",-1,"","","","","",false,false,"",false);;
      reconstructedUserClass.updateObject(this.user);
      
      return reconstructedUserClass;
    }
    /* //// User class integrations*/

    // public functions
    redirect(url:string){
      if(url.trim() == "#"){return false}
      
      location.href = url;
      return true;
    }

    resetUnitSession(){
      localStorage.removeItem("availableVocabularys");
      localStorage.removeItem("CountWrong");
      localStorage.removeItem("CountCorrect");
      location.reload();
    }

    resetUnitSessionWR(){
      localStorage.removeItem("availableVocabularys");
      localStorage.removeItem("CountWrong");
      localStorage.removeItem("CountCorrect");
    }

    logout(){
        this.cookieService.delete("username");
        location.href = "/login";
    }

    /*IMPLEMENT THIS METHOD IN COMPONENT CLASS*/
    // addVocabularyToDictionary(key:string,value:string){

    //      if(value.trim() == ""){
    //       let input_2 = document.getElementById("germanText");
    //       if(input_2){
    //         input_2?.focus();
    //       }

    //       return false;
    //     }
    //     else if(key.trim() == ""){
    //       let input_1 = document.getElementById("englischText");
    //       if(input_1){
    //         input_1?.focus();
    //       }

    //       return false;
    //     }

    //     let dictionaryJSON = localStorage.getItem("dictionary");
    //     if(dictionaryJSON != null){
    //       let dictionary = JSON.parse(dictionaryJSON);

    //       dictionary[key] = value;
    //       localStorage.setItem("dictionary", JSON.stringify(dictionary));
    //       return true;
    //     }
    //     return false;
    // }

    SETchangeReferenceDetection(key:string){
      localStorage.setItem("changeReferenceDetection",key);
    }

    DELETEchangeReferenceDetection(){
      localStorage.removeItem("changeReferenceDetection");
    }

    GETchangeReferenceDetection(){
      if(localStorage.getItem("changeReferenceDetection") != null){
        return localStorage.getItem("changeReferenceDetection");
      }
      else{
        return false;
      }
    }

    public isValidUsername(username: string): boolean {
      // Regex zur Validierung des Benutzernamens
      const regex = /^[a-zA-Z0-9_]{4,40}$/;
  
      // Überprüfen, ob der Benutzername dem Regex entspricht
      return regex.test(username);
  }
  
  public isValidEmail(email: string): boolean {
    // Regex zur Validierung der E-Mail-Adresse
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Überprüfen, ob die E-Mail-Adresse dem Regex entspricht
    return regex.test(email);
  }

  public isValidName(name: string): boolean {
    // Regex zur Validierung des Namens
    const regex = /^[a-zA-Z]{2,40}$/;

    // Überprüfen, ob der Name dem Regex entspricht
    return regex.test(name);
}

    // //// public functions


}