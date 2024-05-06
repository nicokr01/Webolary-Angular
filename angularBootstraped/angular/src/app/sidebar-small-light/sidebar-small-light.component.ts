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

  constructor(protected theme:Theme,protected elementRef:ElementRef,private domsant:DomSanitizer){}

  ngOnInit(){
      this.renderColorThemeButton();

      if(this.theme.getMode() == "dark"){
          var aside = this.elementRef.nativeElement.querySelector("#aside");
          if(aside){
            aside.style.backgroundColor = "rgba(240,240,240,1)";
          }
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
