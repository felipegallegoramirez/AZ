import { Component, OnInit } from '@angular/core';
import { OnlineSale } from 'src/app/models/online-sale';
import { OnlineSalesService } from 'src/app/services/online-sale.service';

@Component({
  selector: 'app-simple-shop-managment',
  templateUrl: './simple-shop-managment.component.html',
  styleUrls: ['./simple-shop-managment.component.css']
})
export class SimpleShopManagmentComponent implements OnInit {

  constructor(private onlineSalesService:OnlineSalesService) { }

  ngOnInit(): void {
   this.id= localStorage.getItem('shop')||"";
   this.search()
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
  solds:Array<OnlineSale>=[]
  select:OnlineSale=new OnlineSale()

  search(){
    // order -  cate - search
    let order= (<HTMLInputElement>document.getElementById("order")).value
    let cate= (<HTMLInputElement>document.getElementById("cate")).value
    let search= (<HTMLInputElement>document.getElementById("search")).value
    let or=order.split("/")
    this.onlineSalesService.getOnlineSaleSearch(search,1,1000,or[0],Number(or[1]),localStorage.getItem("shop")||"").subscribe((res)=>{
      this.solds=[]
      this.solds = res as OnlineSale[]
  })
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
  acept:boolean=false
  refill(a:any){
    this.select=a
    this.add_view();
    this.acept=this.select.state=="acept"?true:false
  }

  enviar(){
    let x = localStorage.getItem("shop")||""
    this.onlineSalesService.postOnlineSaleSold(this.select,x).subscribe(res=>{
      console.log(res)
      this.search()
      this.close()
    })
  }

  negar(){
    let x = localStorage.getItem("shop")||""
    this.onlineSalesService.deleteOnlineSale(this.select._id||"",x).subscribe(res=>{
      console.log(res)
      this.search()
      this.close()
    })
  }

}
