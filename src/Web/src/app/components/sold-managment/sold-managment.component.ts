import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service'
import {Sales} from '../../models/sales'

@Component({
  selector: 'app-sold-managment',
  templateUrl: './sold-managment.component.html',
  styleUrls: ['./sold-managment.component.css'],
  providers:[SalesService]
})
export class SoldManagmentComponent implements OnInit {

  constructor(private salesService:SalesService) { }

  ngOnInit(): void {
    this.actualizar()
  }
/*
              <td>{{data.code}}</td>
              <td>{{data.dni}}</td>
              <td>{{data.total}}</td>
              <td>{{data.date}}</td>
*/
solds:Array<{
    id:string,
    dni:string,
    total:number,
    date:string,
    i:number
  }> =[]

  edit:boolean=false



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

  actualizar(){
    let r = localStorage.getItem("shop") || ""
    this.solds=[]
    this.salesService.getSaless(r).subscribe(res=>{
      console.log(res)
      let x  = res as Sales[]
      for(var i=0;i<x.length;i++){
        this.solds.push({
          id:x[i]._id||"",
          dni:x[i].client?.id||"",
          total:x[i].totalprice||0,
          date:x[i].date||"",
          i:i+1
        })
      }


    })
  }

}
