import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/modelsProducts/inventory';
import { InventoryService } from 'src/app/services/servicesProducts/inventory.service';

@Component({
  selector: 'app-simple-shop-cart',
  templateUrl: './simple-shop-cart.component.html',
  styleUrls: ['./simple-shop-cart.component.css']
})
export class SimpleShopCartComponent implements OnInit {

  constructor(
    private inventoryService:InventoryService,

  ) { }
  inventorys:Array<Inventory>=[]
  prices:Array<number>= []
  total:number=0
  ngOnInit(): void {
    this.inventorys=JSON.parse(localStorage.getItem("cart")||"")
    this.count()
  }
  delete(i:number){
    this.inventorys.splice(i, 1);

  }
  add(i:number){
    this.inventorys[i].count=(this.inventorys[i].count||0)+1
    let x=(this.inventorys[i].price||0)
    this.total+=x
    this.prices[i]+=x
  }
  remove(i:number){
    this.inventorys[i].count=(this.inventorys[i].count||0)-1
    let x=(this.inventorys[i].price||0)
    this.total-=x
    this.prices[i]-=x
    if((this.inventorys[i].count||0)<=0){
      this.delete(i)
    }
  }
  count(){
    this.prices=[]
    this.total=0
    this.inventorys.forEach(data=>{
      let x=(data.count||0)*(data.price||0)
      this.prices.push(x)
      this.total+=x
    })
  }
  next(){
    localStorage.setItem("cart",JSON.stringify(this.inventorys))
    window.location.replace("http://localhost:4200/#/shop-checkout");
  }

}
