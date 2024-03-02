import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-shop-cart-checkout',
  templateUrl: './simple-shop-cart-checkout.component.html',
  styleUrls: ['./simple-shop-cart-checkout.component.css']
})
export class SimpleShopCartCheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  act:number=-1;
  subMenu(menu:number){
    const buttons=document.getElementsByClassName("option")
    const subMenu=document.getElementsByClassName("form")
    for(let i=0;i<2;i++){
      buttons[i].classList.remove("select")
      subMenu[i].classList.add("oculto")
    }
    if(this.act!=menu){
      buttons[menu].classList.add("select")
      subMenu[menu].classList.remove("oculto")
      this.act=menu
    }else{
      this.act=-1
    }

  }

}
