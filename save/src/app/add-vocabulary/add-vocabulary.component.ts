import { Component, ElementRef, HostListener } from '@angular/core';
import { Auth } from '../Auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { Theme } from '../Theme/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { System } from '../WebolarySystem/system';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-add-vocabulary',
  templateUrl: './add-vocabulary.component.html',
  styleUrl: './add-vocabulary.component.scss'
})


export class AddVocabularyComponent extends Auth{
  protected superGlobalStyle = "";
  protected displayMobile = false;
  protected inputActiveState:boolean = false;

  protected inputGerman:string = "";
  protected inputEnglisch:string = "";

  protected VocListTbody:SafeHtml = "";
  protected UnitSizeValue:number = -1;
  protected UnitSize:SafeHtml = this.UnitSizeValue+" Vocabularys";
  public dictionary: { [key: string]: string } = {};
  constructor(cookieService:CookieService, protected theme:Theme, protected elementRef:ElementRef, protected system:System, protected sanitizer:DomSanitizer,protected router:Router,websocket:WebsocketService){
    super(cookieService,websocket);

    /* set navList link*/
    localStorage.setItem("NavListItem","add vocabulary");
   /* set navList link*/

   /*
    Set UnitSize into Green Box right next tot Vocabulary List H2 Element and render Voc list
   */
    this.UnitSize = this.system.getUnitSize() + " Vocabularys";

    /*
    Set UnitSize into Green Box right next tot Vocabulary List H2 Element and render Voc list
   */

    var dicJSON = localStorage.getItem("dictionary");
    if(dicJSON != null){
      this.dictionary = JSON.parse(dicJSON);
    }

    this.UnitSizeValue = Object.keys(this.dictionary).length;
  }

  ngOnInit(){
    /*Implement users theme*/
    if(this.theme.getMode() == "dark"){
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>.theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .textCircle{color:white} #word{color:white} .headlineDiv{color:white;} #first_part{color:white;} #rest{color:white;} #germanText{background-color:var(--darkmode);color:white} #englischText{background-color:var(--darkmode);color:white} #movingSpan{color:white} #c-p-3::before{background-color:rgba(0,0,0,0.65)} #p-v-3{color:white}  #c-p-2::before{background-color:rgba(0,0,0,0.65)} #p-v-2{color:white} #c-p-1::before{background-color:rgba(0,0,0,0.65)} #p-v-1{color:white} .circular-progress{background: conic-gradient(#7d2ae8 3.6deg,rgba(0,0,0,0.65)  0deg);} .analyse{color:white;} #h1{color:white}</style>";
      }
    }
    else{
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>.theme{color:black}";
      }
    }

    /* //// Implement users theme*/

    // Responsive
    if(window.innerWidth < 510){
      this.displayMobile = true;
    }
    // //// Responsive

   
    Object.keys
  }

  // renderVocList(){
  //   this.VocListTbody = this.sanitizer.bypassSecurityTrustHtml(this.system.getVocabularysAsTable());
  // }

  /*Vocabulary list actions*/
  deleteVocFromList(id:number){
    alert("delete:" +id);
  }

  editVocFromList(id:number){
    alert("edit:"+id)
  }
  /* //// Vocabulary list actions*/

    // bluring page is menu is active
    bodyClicked(){
      var v = localStorage.getItem("prMenu");
      if(v !== null && v == "active"){
          this.superGlobalStyle = "filter:blur(10px)";
          localStorage.removeItem("prMenu");
      }
      else if(v !== null && v == "hidden"){
        this.superGlobalStyle = "filter:none";
        localStorage.removeItem("prMenu");
      }
    }
    // //// bluring page

    onFocus(){
      console.log("focus action");
      this.inputActiveState = true;
    }
  
    onBlur(inputID:number){
      this.inputActiveState = false;

      if(inputID == 1){
        if(this.inputGerman == ""){
          let label = document.getElementById("movingSpan");
          label?.classList.remove("moveTop")
          label?.classList.add("moveBottom");
          label!.style.marginTop = "-4rem";
        }
      }
      else if(inputID == 2){
        if(this.inputEnglisch == ""){
          let label = document.getElementById("movingSpanSecond");
          label?.classList.remove("moveTop")
          label?.classList.add("moveBottom");
          label!.style.marginTop = "-4rem";
        }
      }
    }

    inputAreaClicked(){
      let div = document.getElementById("movingSpan");
      if(div){
        div.classList.remove("moveBottom")
        div.classList.add("moveTop");
        div.style.marginTop = "-7rem";
        if(this.theme.getMode() == "dark"){
          div.style.color ="white";
        }
        else{
          div.style.color ="black";
        }
        
      }
  
      let input = document.getElementById("germanText");
      input?.focus();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Enter' || event.keyCode === 13) {
        this.addVocabularyToDictionary(this.inputEnglisch,this.inputGerman);
      }
    }

    inputAreaClickedSecond(){
      let div = document.getElementById("movingSpanSecond");
      if(div){
        div.classList.remove("moveBottom")
        div.classList.add("moveTop");
        div.style.marginTop = "-7rem";
        if(this.theme.getMode() == "dark"){
          div.style.color ="white";
        }
        else{
          div.style.color ="black";
        }
        
      }
  
      let input = document.getElementById("englischText");
      input?.focus();
    }

    deleteVocabularyFromDictionary(key:string){
      this.system.SETchangeReferenceDetection("vocabularyListChanged");
      delete this.dictionary[key];

      this.UnitSizeValue--;
      this.UnitSize = this.UnitSizeValue+" Vocabularys";
      localStorage.setItem("dictionary",JSON.stringify(this.dictionary));
    }


    editVocabularyFromDictionary(ID:number,key:string,value:string){
      let tdKEY = document.getElementById(ID+"_key");
      let tdVALUE = document.getElementById(ID+"_value");

      let inputKey = document.getElementById(ID+"_input_key");
      inputKey!.style.display = "block";

      let inputVaue = document.getElementById("input_value_"+ID);
      inputVaue!.style.display = "block";

      let div = document.getElementById(ID+"_input_div");
      div!.style.display = "none";

      let div2 = document.getElementById(ID+"_input_div2");
      div2!.style.display = "none";

      let input_btn = document.getElementById(ID+"_input_btn");
      input_btn!.style.display = "inline-block";
    }

    updateVocFromVocList(ID:number,oldKey:string){
      let newValue = this.elementRef.nativeElement.querySelector("#input_value_"+ID).value;
      let newKey = this.elementRef.nativeElement.querySelector("#inputField_key_"+ID).value;
      
      if(newKey == oldKey){
        this.dictionary[oldKey] = newValue;
        let URL = location.href;
        if(URL.match("addVocabulary")){
          this.router.navigate(["/add"]);
        }
        else{
          this.router.navigate(["/addVocabulary"]);
        }
      }
      else{
        delete this.dictionary[oldKey];
        this.dictionary[newKey] = newValue;
      }

      this.system.SETchangeReferenceDetection("vocabularyListChanged");
      localStorage.setItem("dictionary",JSON.stringify(this.dictionary));
    }

    addVocabularyToDictionary(key:string,value:string){
    
      this.system.SETchangeReferenceDetection("vocabularyListChanged");
      if(value.trim() == ""){
        let input_2 = document.getElementById("germanText");
        if(input_2){
          input_2?.focus();
        }
        return false;
      }
      else if(key.trim() == ""){
        let input_1 = document.getElementById("englischText");
        if(input_1){
          input_1?.focus();
        }
        return false;
      }

      if(this.inputGerman.trim() == "" || this.inputEnglisch.trim() == ""){return false}

      this.dictionary[key] = value;
      this.UnitSizeValue++;
      this.UnitSize = this.UnitSizeValue+" Vocabularys";
      localStorage.setItem("dictionary",JSON.stringify(this.dictionary)); 

      this.inputGerman = "";
      this.inputEnglisch = "";

      return true;
    }

    getDictionaryKeys(){
      return Object.keys(this.dictionary);
    }

    public resetDictionary():void{
      this.dictionary = {};
      localStorage.setItem("dictionary",JSON.stringify(this.dictionary));
      this.UnitSize = 0;
    }
}
