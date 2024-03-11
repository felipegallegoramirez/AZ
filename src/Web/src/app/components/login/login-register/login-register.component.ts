import { Component, OnInit } from '@angular/core';
import {UserService } from '../../../services/user.service'
import {AuthService } from '../../../services/auth.service'
import { error } from 'console';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [UserService,AuthService]
})
export class LoginRegisterComponent implements OnInit {

  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
  }



  RegisterOne (){
    var email = (<HTMLInputElement>document.getElementById("email_register")).value;
    var password = (<HTMLInputElement>document.getElementById("password_register")).value;
    var password2 = (<HTMLInputElement>document.getElementById("password2_register")).value;

    
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    if (!emailRegex.test(email)){
      alert("correo invalido")
    }
    else if(!strongRegex.test(password)){
      alert(`Minimo una Mayuscula, 
      Minimo una minuscula,
      Minimo un numero,
      Minimo un Simbolo especial`)
    }
    else if(password !== password2){
      alert(`Las contraseñas no coinciden`)
    }else{
      this.central()
    }
    
  }

  RegisterTwo (){
    var nameshop = (<HTMLInputElement>document.getElementById("nameshop_register")).value;
    var nit = (<HTMLInputElement>document.getElementById("nit_register")).value;
    var name = (<HTMLInputElement>document.getElementById("name_register")).value;
    var address = (<HTMLInputElement>document.getElementById("address_register")).value;
    var phone = (<HTMLInputElement>document.getElementById("phone_register")).value;

    if(nameshop.length<2){
      alert(`Nombre de tienda Invalido`)
    }else if(nit.length<5){
      alert(`Nit Invalido`)
    }
    else if(name.length<5){
      alert(`Nombre Invalido`)
    }
    else if(address.length<5){
      alert(`Direccion Invalido`)
    }
    else if(phone.length<5){
      alert(`Celular Invalido`)
    }else{

      var email = (<HTMLInputElement>document.getElementById("email_register")).value;
      var password = (<HTMLInputElement>document.getElementById("password_register")).value;



      var data= {
        email: email ,
        password: password ,
        name: name,
        phone: phone,
        shop: {
          email: email,
          nit: nit,
          name: nameshop,
          addres: address,
          phone: phone,
        },
      }
      
      this.userService.postRegister(data).subscribe((res)=>{
        console.log(res)
      })
    }
  }
  








  login(){
    var email = (<HTMLInputElement>document.getElementById("email_login")).value;
    var password = (<HTMLInputElement>document.getElementById("password_login")).value;
    var data={
      email:email,
      password:password
    } 
    this.authService.postAuth(data).subscribe((res)=>{
      window.location.replace("http://localhost:4200/#/emailsend");
    },(error)=>{
      alert(error)
    })

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
