import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  elementId:string = '';

  itemDisplay(index:string){
    this.elementId = index;
    let selectedElement = document.getElementById(`${this.elementId}`);
    let elementsArray = Array.from(document.getElementsByClassName('questionHead'));
    for(let ele of elementsArray){
        if(ele != selectedElement){
          ele.classList.remove('questionHeadFocus');
        }
        else{
          ele.classList.add('questionHeadFocus');
        }
    }
  }
}
