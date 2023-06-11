
import { Component, OnInit } from '@angular/core';
import {Inventory} from'../../models/modelsProducts/inventory'
import {InventoryService} from '../../services/servicesProducts/inventory.service'
import { ProductCategoryService } from '../../services/servicesProducts/productcategory.service'
import { ProductCategory } from '../../models/modelsProducts/productcategory'
import {Clients} from'../../models/clients'
import { ClientsService} from "../../services/clients.service"
import { Sales} from'../../models/sales'
import { SalesService} from "../../services/sales.service"
import { asapScheduler } from 'rxjs';


@Component({
  selector: 'app-inventory-till',
  templateUrl: './inventory-till.component.html',
  styleUrls: ['./inventory-till.component.css'],
  providers: [ProductCategoryService, InventoryService, ClientsService]
})
export class InventoryTillComponent implements OnInit {
  contador:number=0;
  constructor( private productCategoryService:ProductCategoryService, private inventoryService:InventoryService,private clientsService:ClientsService, private salesService: SalesService) { }

  // TODO variables
  category: Array<{
    id:string,
    name:string
    image:string
  }> =[]

  products: Array<{
    id:string,
    name:string,
    code:string,
    price:string,
    points:number,
    count:number,
    category:string,
    idcategory:string,
    i:number,
    image:string
  }> =[]

  carrito: Array<{
    id:string,
    name:string,
    points:number,
    totalpoints:number
    count:number,
    price:number,
    total:string,
  }> =[]

  pago:{
    total:number;
    pagar:number;
    devuelta:number;
  }={
    total:0,
    pagar:0,
    devuelta:0
  }




  //! Basico

  Modal1(){
    if(this.contador==0){
      document.querySelector("#Mymodal")?.classList.add("visto")
      this.contador=1
    }else{
      document.querySelector("#Mymodal")?.classList.remove("visto")
      this.contador=0
    }
  }
    ngOnInit(): void {
      this.actualizar()
    }
  
  
  
  

  
    getProducts(){
      this.products=[]
      this.inventoryService.getInventorys().subscribe((res) =>{
  
        let data = res as Inventory[]
        this.products=[]
        for (let i=0; i< data.length ;i++){
          let ar=this.category.find((x)=>data[i].category==x.id)
          this.products.push({
            id:data[i]._id||"",
            name:data[i].productname||"",
            code:data[i].code||"",
            price:data[i].price?.toLocaleString()||"0",
            points:data[i].points||0,
            count:data[i].count||0,
            category: ar?.name||"",
            idcategory: data[i].category || "",
            i:i+1,
            image:"http://localhost:3000/public/images/"+data[i].image ||""
          })
  
        }
      })
    }
  
  
    actualizar (){
      this.category=[]
      this.productCategoryService.getProductCategorys().subscribe((res) =>{
        let data = res as ProductCategory[]
        
        for (let i=0; i< data.length ;i++){
          this.category.push({
            id:data[i]._id||"",
            name:data[i].name||"",
            image:data[i].image ||""
          })
        }
        this.getProducts()
      })
    }

    //! Busqueda

    search(){
      // order -  cate - search
      let cate= (<HTMLInputElement>document.getElementById("cate")).value
      let search= (<HTMLInputElement>document.getElementById("search")).value
      console.log(search)
      this.inventoryService.getProductSearch(search,1,1000,"code",1,cate).subscribe((res)=>{
        let data = res as Inventory[]
        this.products=[]
        for (let i=0; i< data.length ;i++){
          let ar=this.category.find((x)=>data[i].category==x.id)
          this.products.push({
            id:data[i]._id||"",
            name:data[i].productname||"",
            code:data[i].code||"",
            price:data[i].price?.toLocaleString()||"0",
            points:data[i].points||0,
            count:data[i].count||0,
            category: ar?.name||"",
            idcategory: data[i].category || "",
            i:i+1,
            image:"http://localhost:3000/public/images/"+data[i].image ||""
          })
        }
      })
    }


    //! Carrito

    agregar(id:string){
      let result = this.carrito.findIndex(x=>x.id==id)
      let produ= this.products.findIndex(x=>x.id==id)
      if(Number(this.products[produ].count)>0){
      if(result!=-1){
        

          this.carrito[result].count+=1
   
          this.carrito[result].total=(this.carrito[result].count*this.carrito[result].price).toLocaleString()
          this.carrito[result].totalpoints=(this.carrito[result].count*this.carrito[result].points)
        }

      else{
        let data = this.products[produ]
        this.carrito.push({
          id:data?.id||"",
          name:data?.name||"",
          count:1,
          price:Number(data?.price)||0,
          points:data?.points ||0,
          totalpoints:data?.points||0,
          total:data?.price.toLocaleString()||"0",
        })
      }        
      this.pago.total+=Number(this.products[produ].price)
      this.products[produ].count-=1
    }


    }

    eliminar(id:string){
      let result = this.carrito.findIndex(x=>x.id==id)
      if(this.carrito[result].count>1){
        let produ= this.products.findIndex(x=>x.id==id)
          this.carrito[result].count-=1
          this.products[produ].count+=1
          this.carrito[result].total=(this.carrito[result].count*this.carrito[result].price).toLocaleString()
          this.carrito[result].totalpoints=(this.carrito[result].count*this.carrito[result].points)
          this.pago.total-=Number(this.products[produ].price)


      }else{
        let produ= this.products.findIndex(x=>x.id==id)
        this.products[produ].count+=1
        this.carrito.splice(produ,produ+1)
        this.pago.total-=Number(this.products[produ].price)
      }
    }


    cliente:Clients=new Clients()
    stado:boolean=true
    //! Cliente
    searchclient(){
      // order -  cate - search
      let search= (<HTMLInputElement>document.getElementById("SearchInventory")).value
      if(search.trim().length<=3){
        this.cliente=new Clients()
      }else{
        if(this.stado){
        this.stado=false
        this.clientsService.getClientSearch(search,1,1,"dni",1).subscribe((res)=>{
          let data = res as Clients[]
          if(data[0]){
            this.cliente=data[0]
          }else{
            this.cliente=new Clients(undefined,"No encontrado",0,"No encontrado",undefined,0)
          }
          this.stado=true
        })
      }
      }
    }

    pagar(){
      let pago= (<HTMLInputElement>document.getElementById("pago")).value
      console.log(pago)
      this.pago.pagar=Number(pago)
      this.pago.devuelta=this.pago.pagar-this.pago.total
    }

    buy(){
      /*
      _id?:string;
  time?: string;
  client?: {
    id?: string;
    dni?: number;
    name?: string;
  };
  employee?: {
    id?: string;
    dni?: number;
    name?: string;
  };
  date?: string;
  product?: Array<{
    id?: string;
    name?: string;
    count?: number;
    unitarypoints?: string;
    totalpoints?: number;
    unitaryprice?: string;
    totalprice?: number;
  }>;
  service?: Array<{
    id?: string;
    name: string;
    points?: string;
    price?: string;
    time: string;
    date: string;
  }>;
  totalprice?: number;
  totalpoints?: number;
  shopid: string; */
      asapScheduler

      let sal = new Sales()
      this.salesService.postSales(sal).subscribe(res=>{

      })
    }

  
}
