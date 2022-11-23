import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
   contador:number = 1;
  constructor() { }

  ngOnInit(): void {
    
  }
  Hidden(){
      
    
    if(this.contador==0){
        document.querySelector("#Central")?.classList.add("visto"),
        this.contador=1}

    else{
        document.querySelector("#Central")?.classList.remove("visto"),
        this.contador=0
    }



  }
}
