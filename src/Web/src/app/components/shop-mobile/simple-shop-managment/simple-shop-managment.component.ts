import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-shop-managment',
  templateUrl: './simple-shop-managment.component.html',
  styleUrls: ['./simple-shop-managment.component.css']
})
export class SimpleShopManagmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   this.id= localStorage.getItem('shop')||"";
  }
  edit:boolean=false
  editar(){
    this.edit= this.edit==true?false:true
  }
  id:string=""


  getClients(){
    
  }


  actualizar (){
      this.getClients()
  }

  search(){
  }

  // ! ----------- Paneles -----------

  rara(op:number) {
    let a=document.querySelector(".inf")?.children[0].children[op*2].children[0].children[0]
    if(a?.classList.contains("noocult")){
      a.classList.remove("noocult")
    }else{
      a?.classList.add("noocult")
    }
  }

  add_view(){
    let background= document.getElementById("background_panel")
    let panel= document.getElementById("panel")
    background?.classList.remove("oculto")
    panel?.classList.remove("oculto")
  }


  close(){
    let background= document.getElementById("background_panel")
    let panel= document.getElementById("panel")
    background?.classList.add("oculto")
    panel?.classList.add("oculto")
  }

  // !---

  refill(a:any){

  }

}
