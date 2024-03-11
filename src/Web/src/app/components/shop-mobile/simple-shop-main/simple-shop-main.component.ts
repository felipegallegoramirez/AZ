import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/modelsProducts/inventory';
import { InventoryService } from 'src/app/services/servicesProducts/inventory.service';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-simple-shop-main',
  templateUrl: './simple-shop-main.component.html',
  styleUrls: ['./simple-shop-main.component.css']
})
export class SimpleShopMainComponent implements OnInit {

  constructor(
    private inventoryService:InventoryService,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  inventorys:Array<Inventory>=[]
  cart:Array<Inventory>=[]
  id:string=""
  getProducts(){
    this.activatedRoute.params.subscribe(params => { 
      this.id= params['id'];
      this.inventoryService.getInventorysOnline(this.id).subscribe((res) =>{

        this.inventorys = res as Inventory[]
      })
    })

  }

  add(i:number){
    let index=this.cart.findIndex(x=>x._id==this.inventorys[i]._id)
    if(index!=-1){
        this.cart[index].count=(this.cart[index].count||0)+1 ;

    }else{
      this.cart.push(this.inventorys[i])
      this.cart[this.cart.length-1].count=1
    }

  }

  next(){
    localStorage.setItem("cart",JSON.stringify(this.cart))
    window.location.replace("http://localhost:4200/#/shop-cart/"+this.id);
  }


}
