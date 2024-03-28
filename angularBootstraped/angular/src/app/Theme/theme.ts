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
        return "error";
    }

    getSystemColorScheme(): string {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'white';
        } else {
            return 'unknown';
        }
    }
}