export class System{
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
      return -1;
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

                return result;
            }
        }
        return false;
    }

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
        
  
        // check if word without true is correct !
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
        speed = 50;
        
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
    
}