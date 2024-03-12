import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventory } from 'src/app/models/modelsProducts/inventory';
import { OnlineSale } from 'src/app/models/online-sale';

import { OnlineSalesService } from 'src/app/services/online-sale.service';

@Component({
  selector: 'app-simple-shop-cart-checkout',
  templateUrl: './simple-shop-cart-checkout.component.html',
  styleUrls: ['./simple-shop-cart-checkout.component.css']
})
export class SimpleShopCartCheckoutComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
    private onlineSalesService:OnlineSalesService
    ) {}
   id:string=""

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      this.id= params['id'];
    })

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

  whatsapp(){
    let online:OnlineSale=new OnlineSale()
    let name = (<HTMLInputElement>document.getElementById("waName")).value||"";
    let dni = Number((<HTMLInputElement>document.getElementById("waDni")).value)||0;
    let number = (<HTMLInputElement>document.getElementById("waNumber")).value||"";
    let address = (<HTMLInputElement>document.getElementById("waAddres")).value||"";

    online.client={
      id:"",
      dni,
      name,
      number,
      address
    }
    online.state="new"
    online.shopid=this.id

    // * Fecha
    var fechaActual = new Date();
    var año = fechaActual.getFullYear();
    var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    var día = fechaActual.getDate().toString().padStart(2, '0');
    var fecha = año + "/" + mes + "/" + día;
    online.date=fecha

    online.option=1
    online.metod="Wa"
    var totalpoints = 0
    var totalprice = 0
    online.product=[]
    
    var items:Inventory[]=JSON.parse(localStorage.getItem("cart")||"")

    items.forEach(element => {
      totalpoints+=(element.count||0)*(element.points||0)
      totalprice+=(element.count||0)*(element.price||0)
      online.product?.push({
        id:element._id,
        count:element.count,
        name:element.productname,
        totalpoints:(element.count||0)*(element.points||0),
        totalprice:(element.count||0)*(element.price||0),
        unitarypoints:element.points,
        unitaryprice:element.price
      })
    });
    online.totalpoints=totalpoints
    online.totalprice=totalprice

    delete online._id

    console.log(online)

    this.onlineSalesService.postOnlineSale(online,this.id).subscribe(res=>{
      console.log(res)
      window.location.replace("https://wa.me/573052572814?text=Hola,%20¿cómo%20estás%3F%20Mi%20Codigo%20es%20:%20"+res._id);
      

    })


  }

}
