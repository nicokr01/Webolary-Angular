
export class Theme{
    protected mode:string = "";

    constructor(){
        // Get Theme setting
        var theme = localStorage.getItem("themeSetting");

        if(theme){
            this.mode = theme;
        }
        else{
            //no setting found so create it
            localStorage.setItem("themeSetting",this.getSystemColorScheme());
            location.reload();
        }
    }

    setDarkmode(){
        localStorage.setItem("themeSetting","dark");
    }

    setWhitemode(){
        localStorage.setItem("themeSetting","white");
    }

    getMode(){
        return this.mode;
    }

    switchMode(){
        if(this.getMode() == "dark"){
            this.setWhitemode();
            this.mode = "white";
        }
        else if(this.getMode() == "white"){
            this.setDarkmode();
            this.mode = "dark";
        }


        if(this.getMode() == "dark"){
            var darkDiv = document.querySelector("#darkModeDiv");
            if(darkDiv){
              darkDiv.innerHTML = "<style>.themeBorder{border:0.33px solid white;} .theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .headOBJ{background-color: rgb(29,36,40);} .category{border: 1.5px solid white;} .subject{background-color: rgb(39,46,50);} .subject:hover{background-color: rgb(55,62,66);} #prg{background-color:rgba(0,0,0,0.65)} .textCircle{color:white} #word{color:white} .headlineDiv{color:white;} #first_part{color:white;} #rest{color:white;} #germanText{background-color:var(--darkmode);color:white} #movingSpan{color:white} #c-p-3::before{background-color:rgba(0,0,0,0.65)} #p-v-3{color:white}  #c-p-2::before{background-color:rgba(0,0,0,0.65)} #p-v-2{color:white} #c-p-1::before{background-color:rgba(0,0,0,0.65)} #p-v-1{color:white} .circular-progress{background: conic-gradient(#7d2ae8 3.6deg,rgba(0,0,0,0.65)  0deg);} .analyse{color:white;} #englischText{background-color:var(--darkmode);color:white} .boxCol{background-color:rgb(242,242,242)}</style>";
           
            }
          }
          else{
            var darkDiv = document.querySelector("#darkModeDiv");
            if(darkDiv){
              darkDiv.innerHTML = "<style>.themeBorder{border:0.33px solid black;} .theme{color:black} .headOBJ{background-color:rgb(242, 242, 242);} .category{border: 1.5px solid black;} .subject{background-color: rgb(232,232,232);} .subject:hover{background-color: rgb(225,225,225);} .boxCol{background-color:white}";
            }
        }
        
    }

    getSystemColorScheme(): string {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'white';
        } else {
            //default return
            return 'dark';
        }
    }
}