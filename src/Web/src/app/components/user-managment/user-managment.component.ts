import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rara(op:number) {
    console.log("me meti")
    let a=document.querySelector(".inf")?.children[0].children[op*2].children[0].children[0]
    console.log(a)
    if(a?.classList.contains("noocult")){
      a.classList.remove("noocult")
    }else{
      a?.classList.add("noocult")
    }
  }
}
