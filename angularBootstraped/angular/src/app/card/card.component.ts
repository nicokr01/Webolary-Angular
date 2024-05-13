import { Component, Input } from '@angular/core';
import { System } from '../WebolarySystem/system';
import { Router } from '@angular/router';
import { Theme } from '../Theme/theme';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  @Input() name: string | undefined;
  @Input() creator: string | undefined;
  @Input() dictionary: string | undefined;

  constructor(protected system:System,protected router:Router, protected theme:Theme){}

  LoadUnit(){
    if(this.dictionary != undefined){localStorage.setItem("dictionary",this.dictionary);this.system.SETchangeReferenceDetection("vocabularyListChanged");this.router.navigate(["/"])}  
  }

  addVocabulary(){
    
  }
}

