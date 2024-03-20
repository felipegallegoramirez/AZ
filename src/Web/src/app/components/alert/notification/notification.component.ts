import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  actualizar(){
    // ! Recuerde cambiar el APP
    localStorage.setItem("version","2")
    const x=document.getElementById("oculter")
    x?.classList.add("oculto")
    const y=document.getElementById("data")
    y?.classList.add("oculto")
  }

}
