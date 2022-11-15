import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sold-managment',
  templateUrl: './sold-managment.component.html',
  styleUrls: ['./sold-managment.component.css']
})
export class SoldManagmentComponent implements OnInit {

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
