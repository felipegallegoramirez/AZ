import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-r-service-workspace',
  templateUrl: './r-service-workspace.component.html',
  styleUrls: ['./r-service-workspace.component.css'],
})
export class RServiceWorkspaceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.mes(0)
    this.semana(0)
    this.dia(0)
    this.inicial()
  }

  mes(ob: any) {
    var a = document.querySelector('#mes')?.children;
    if (a) {
      for (var i = 0; i <= a.length; i++) {
        a[i]?.classList.remove('active');
      }
      a[ob]?.classList.add('active');
    }
  }
  semana(ob: any) {
    var a = document.querySelector('#semana')?.children;
    if (a) {
      for (var i = 0; i <= a.length; i++) {
        a[i]?.classList.remove('active');
      }
      a[ob]?.classList.add('active');
    }
  }
  dia(ob: any) {
    let a = document.querySelector('#dia')?.children;
    if (a) {
      for (var i = 0; i <= a.length; i++) {
        a[i]?.classList.remove('active');
      }
      a[ob]?.classList.add('active');
    }
  }
  mostrar(ob:any){
    let a=document.querySelector("#workbench")?.children[ob]
    if(a?.classList.contains("active")){
      a.classList.remove("active")
    }else{
      a?.classList.add("active")
    }
  }

  inicial(){
    let a=document.querySelector("#workbench")?.children
      if (a) {
      for (var i = 0; i <= a.length; i++) {
        a[i]?.classList.add('active');
      }
    }
  }

  final(){
    let a=document.querySelector("#panel")
    let b=document.querySelector("#menu")
    let c=document.querySelector("#left")
    if(a?.classList.contains("oculto")){
      a.classList.remove("oculto")
      b?.classList.remove("oculto")
      c?.classList.add("noflow")
    }else{
      a?.classList.add("oculto")
      b?.classList.add("oculto")
      c?.classList.remove("noflow")
    }
  }



}
