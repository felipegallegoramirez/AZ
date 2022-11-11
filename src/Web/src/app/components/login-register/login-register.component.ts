import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  ver(clase:string){
    let objeto=document.getElementsByClassName(clase)
    objeto[0]?.classList.remove("ocultar")
    objeto[0]?.classList.add("ver")
    objeto[1]?.classList.remove("ocultar")
    objeto[1]?.classList.add("ver")
  }
  ocultar(clase:string){
    let objeto=document.getElementsByClassName(clase)
    objeto[0]?.classList.add("ocultar")
    objeto[0]?.classList.remove("ver")
    objeto[1]?.classList.add("ocultar")
    objeto[1]?.classList.remove("ver")
  }
  derecha(clase:string){
    let panel2=document.querySelector(clase)
    panel2?.classList.remove("left")
    panel2?.classList.add("right")
    panel2?.classList.remove("center")
    panel2?.classList.remove("devolver")
  }
  izquierda(clase:string){
    let panel2=document.querySelector(clase)
    panel2?.classList.add("left")
    panel2?.classList.remove("right")
    panel2?.classList.remove("center")
    panel2?.classList.remove("devolver")
  }

  centrar(clase:string){
    let panel2=document.querySelector(clase)
    panel2?.classList.remove("right")
    panel2?.classList.remove("left")
    panel2?.classList.add("center")
    panel2?.classList.remove("devolver")
  }

  centrar2(clase:string){
    let panel2=document.querySelector(clase)
    panel2?.classList.remove("right")
    panel2?.classList.remove("left")
    panel2?.classList.add("center2")
    panel2?.classList.remove("devolver")
  }

  devolver1(clase:string){
    let panel2=document.querySelector(clase)
    panel2?.classList.remove("right")
    panel2?.classList.remove("left")
    panel2?.classList.remove("center")
    panel2?.classList.add("devolver")
  }
  devolver2(clase:string){
    let panel2=document.querySelector(clase)
    panel2?.classList.remove("right")
    panel2?.classList.remove("left")
    panel2?.classList.remove("center2")
    panel2?.classList.add("devolver2")
  }
  quitar(){

    this.ver("content2")
    this.ocultar("content1")
    this.ocultar("content3")
    this.izquierda(".nowhite")
    this.derecha(".white")

    
  }

  devolver(){

    this.ver("content2")
    this.ocultar("content1")
    this.ocultar("content3")
    this.devolver1(".white")
    this.devolver2(".nowhite")

    
  }
  agregar(){
    this.ver("content1")
    this.ocultar("content2")
    this.ocultar("content3")
    this.izquierda(".white")
    this.derecha(".nowhite")
  }

  central(){
    this.ver("content3")
    this.ocultar("content1")
    this.ocultar("content2")
    this.centrar(".white")
    this.centrar2(".nowhite")

  }

}
