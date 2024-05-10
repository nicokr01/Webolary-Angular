import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar-small-light',
  templateUrl: './sidebar-small-light.component.html',
  styleUrl: './sidebar-small-light.component.css'
})
export class SidebarSmallLightComponent {
  protected modeSVG:SafeHtml = "";
  protected asideStyle = "";

  constructor(protected theme:Theme,protected elementRef:ElementRef,private domsant:DomSanitizer){}

  ngOnInit(){
      this.renderColorThemeButton();

      if(this.theme.getMode() == "dark"){
          var aside = this.elementRef.nativeElement.querySelector("#aside");
          if(aside){
            aside.style.backgroundColor = "rgba(240,240,240,1)";
          }

          this.asideStyle = "background-image: linear-gradient(to bottom, #000000, #310620, #540048, #670083, #5120ce);z-index: 99;position: fixed;";
      }
      else{
        this.asideStyle = "background-image: linear-gradient(to bottom, #ffffff, #d3c9f8, #a893ee, #7f5ee0, #5120ce);z-index: 99;position: fixed;";
      }

  }

  switchMode(){
      this.theme.switchMode();
      this.renderColorThemeButton();
  }

  renderColorThemeButton(){
    if(this.theme.getMode() == "white"){
      this.modeSVG = this.domsant.bypassSecurityTrustHtml("<img src='../../../assets/image/whiteMode.svg' ><img style='display:none' src='../../../assets/image/darkMode.svg' >");
  }
    else if (this.theme.getMode() == "dark"){
      this.modeSVG = this.domsant.bypassSecurityTrustHtml("<img src='../../../assets/image/darkMode.svg' ><img style='display:none' src='../../../assets/image/whiteMode.svg' >");
    }
  }
}
