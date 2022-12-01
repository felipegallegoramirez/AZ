import { AnimateChildOptions } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alturaanimado:number = 0;
  
  constructor() { }

  ngOnInit(): void {
    
  }
  /*ScrolAnimate(){
    let animado = document.querySelectorAll("#AnimationMiddleBody1");
    let scrollTop = document.documentElement.scrollTop;

    for(var i=0; i<animado.length; i++){
      
      if(this.alturaanimado < scrollTop){
        this.animado<i>.style.opacity = 1;
      }
    }

    window.addEventListener('scroll', mostrarScroll);
  }*/
}
