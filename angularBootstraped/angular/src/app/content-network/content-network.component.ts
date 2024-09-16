import { Component, ElementRef, HostListener } from '@angular/core';
import { Theme } from '../Theme/theme';
import { CookieService } from 'ngx-cookie-service';
import { getUser } from '../WebolarySystem/getUser';
import { User } from '../User/User';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content-network',
  templateUrl: './content-network.component.html',
  styleUrl: './content-network.component.css'
})
export class ContentNetworkComponent {
  protected displayMobile:boolean = false;
  protected superGlobalStyle = "";
  protected FileSystem:any = {};
  protected HeadObjs:any = {};
  protected CDN_Data:any = {};
  protected loadingAnimationState:boolean = true;
  protected TimeoutSet = false;
  protected user:User = new User("","",-1,"","","","","",false,false,"",false);
  protected subjectClicked = false;
  protected selectSubjectName:string = '';
  protected selectedHeadObject:string = '';
  protected reference:string = '';
  protected selectedView:boolean = false;
  protected selectedEntry:string = '';
  protected safeImageUrl: SafeResourceUrl;
  protected previewProvidedStatus:boolean = false;

  constructor(private sanitizer: DomSanitizer,protected cookie:CookieService, protected elementRef:ElementRef,protected theme:Theme, protected router:Router){
    this.user = getUser.get();

    this.safeImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://abc.com");
  }

  ngOnInit(){
    this.getStructData();
    this.getFileData();

    setTimeout(() => {
      if(Object.keys(this.FileSystem).length === 0 || Object.keys(this.CDN_Data).length === 0){
        this.loadingAnimationState = true;
      }
      else{
        this.loadingAnimationState = false;
      }

      this.TimeoutSet = true;
    }, 500);

    /*Implement users theme*/
  if(this.theme.getMode() == "dark"){
    var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
    if(darkDiv){
      darkDiv.innerHTML = "<style>.themeBorder{border:0.33px solid white;} .theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .headOBJ{background-color: rgb(29,36,40);} .category{border: 1.5px solid white;} .subject{background-color: rgb(39,46,50);} .subject:hover{background-color: rgb(55,62,66);}</style>";
    }
  }
  else{
    var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
    if(darkDiv){
      darkDiv.innerHTML = "<style>.themeBorder{border:0.33px solid black;} .theme{color:black} .headOBJ{background-color:rgb(242, 242, 242);} .category{border: 1.5px solid black;} .subject{background-color: rgb(232,232,232);} .subject:hover{background-color: rgb(225,225,225);}";
    }
  }

  /* //// Implement users theme*/

  /* set navList link*/
  localStorage.setItem("NavListItem","Webolary Content Network");
  /* set navList link*/

  // Responsive
  if(window.innerWidth < 510){
    this.displayMobile = true;
  }
  // //// Responsive
  }

    // bluring page if menu is active
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


    // click action handler
    protected clickOnSubject(subjectName:string,headObj:string){
      this.subjectClicked = true;
      this.selectSubjectName = subjectName;
      this.selectedHeadObject = headObj;

      let targetObj = this.FileSystem[headObj].find((element: { name: string; short:string; reference:string}) => element.name == subjectName);
      if(targetObj){
        this.reference = targetObj.reference;
      }
      else{
        console.error("Exception 156: Unable to locate refernce");
      }
    }

    protected fomartTitle(fileName:string){
      let parts = fileName.split('_'); 
      let result = parts[4];
      return result?.split('.')[0];
    }

    protected formatText(fileName:string){
      let parts = fileName.split('_'); 
      let text = parts[0]+" by "+parts[1]+" ➜ "+parts[2]+' Class'
      return text;
    }

    protected getImageURL(fileName:string):string{
      let fileTyp = fileName.split('.')[1]; 
      
      if(fileTyp == 'jpg' || fileTyp == "jpeg" || fileTyp == "png" || fileTyp == "svg"){
        return "../../assets/image/WebolaryCDN_Image_img.webp";
      }
      else if(fileTyp == "pdf"){
        return "../../assets/image/WebolaryCDN_Image_pdf.webp";
      }
      else{
        return "../../assets/image/WebolaryCDN_Image_something.webp";
      }

      return "";
    }


    protected backToCDN_Dashboard(){
      this.subjectClicked = false;
      this.selectedView = false;
    }

    protected selectView(entry:string):void{
      this.selectedView = true;
      this.selectedEntry = entry;
    }

    protected backToSubjectView(){
      this.selectedView = false;
    }

    protected getImageURLData(entry:string){
      return "https://api.webolary.com/CDN_struct/"+this.reference+"/"+entry;
    }

    protected getImageStreamAPI(entry:string){
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://api.webolary.com/CDN_external_connector.php/?token='+this.cookie.get('username')+'&container='+this.reference+'&ressource='+entry);

      return 'http://api.webolary.com/CDN_external_connector.php/?token='+this.cookie.get('username')+'&container='+this.reference+'&ressource='+entry;
    }


    protected isSupportedPreviewFile(fileName: string): boolean{
      const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'ico'];
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      return fileExtension ? supportedExtensions.includes(fileExtension) : false;
    }

    // data fetching
    async getStructData(){
      const url = 'https://api.webolary.com/?CDN=&token='+this.cookie.get("username");
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.FileSystem = data;
        this.HeadObjs = Object.keys(data);

        if(this.TimeoutSet){
          this.loadingAnimationState = false;
        }
      })
      .catch(error => {
        console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
      });
    }

    async getFileData(){
      const url = 'https://api.webolary.com/?CDN-data&CDN=&token='+this.cookie.get("username");
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.CDN_Data = data;
        if(this.TimeoutSet){
          this.loadingAnimationState = false;
        }
      })
      .catch(error => {
        console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
      });
    }


}
