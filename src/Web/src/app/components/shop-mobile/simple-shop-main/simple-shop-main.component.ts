import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/modelsProducts/inventory';
import { InventoryService } from 'src/app/services/servicesProducts/inventory.service';


import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/servicesProducts/productcategory.service';
import { ProductCategory } from 'src/app/models/modelsProducts/productcategory';


@Component({
  selector: 'app-simple-shop-main',
  templateUrl: './simple-shop-main.component.html',
  styleUrls: ['./simple-shop-main.component.css']
})
export class SimpleShopMainComponent implements OnInit {

  constructor(
    private inventoryService:InventoryService,
    private activatedRoute:ActivatedRoute,
    private productCategoryService:ProductCategoryService

  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  inventorys:Array<Inventory>=[]
  cart:Array<Inventory>=[]
  id:string=""
  inventorysfilter:Array<Inventory>=[]
  category:Array<any>=[]
  getProducts(){
    this.activatedRoute.params.subscribe(params => { 
      this.id= params['id'];
      this.inventoryService.getInventorysOnline(this.id).subscribe((res) =>{

        this.inventorys = res as Inventory[]
        this.inventorysfilter = res as Inventory[]
        this.getcategory()
        

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

  getcategory(){
    this.category=[]
    this.productCategoryService.getProductCategorys().subscribe((res) =>{
      let data = res as ProductCategory[]
      
      for (let i=0; i< data.length ;i++){
        this.category.push({
          id:data[i]._id||"",
          name:data[i].name||"",
        })
      }
    })
  }

  next(){
    localStorage.setItem("cart",JSON.stringify(this.cart))
    window.location.replace("http://localhost:4200/#/shop-cart/"+this.id);
  }

  change(){
    let cate= (<HTMLInputElement> document.getElementById("cate")).value||""
    this.inventorysfilter=[]
    if(cate==""){
      this.inventorysfilter=this.inventorys
    }else{
      this.inventorysfilter=this.inventorys.filter(x=>x.category==cate)
    }

  }


}
