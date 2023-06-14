
import { Component, OnInit } from '@angular/core';
import {Inventory} from'../../models/modelsProducts/inventory'
import {InventoryService} from '../../services/servicesProducts/inventory.service'
import { ProductCategoryService } from '../../services/servicesProducts/productcategory.service'
import { ProductCategory } from '../../models/modelsProducts/productcategory'
import {Clients} from'../../models/clients'
import { ClientsService} from "../../services/clients.service"
import { Sales} from'../../models/sales'
import { SalesService} from "../../services/sales.service"
import { PdfService} from "../../services/pdf.service"


@Component({
  selector: 'app-inventory-till',
  templateUrl: './inventory-till.component.html',
  styleUrls: ['./inventory-till.component.css'],
  providers: [ProductCategoryService, InventoryService, ClientsService]
})
export class InventoryTillComponent implements OnInit {
  contador:number=0;
  constructor( private productCategoryService:ProductCategoryService, private inventoryService:InventoryService,private clientsService:ClientsService, private salesService: SalesService,private pdfService:PdfService) { }

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
    price:number,
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
    count: number,
    unitarypoints:number
    totalpoints:number,
    unitaryprice:number,
    totalprice:number,
  }> =[]

  pago:{
    total:number;
    pagar:number;
    devuelta:number;
    point:number;
  }={
    total:0,
    pagar:0,
    devuelta:0,
    point:0
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
            price:data[i].price||0,
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
            price:data[i].price||0,
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
      let produ= this.products.findIndex(x=>x.id==id)
      if(Number(this.products[produ].count)>0){
      let result = this.carrito.findIndex(x=>x.id==id)
      if(result!=-1){     
          this.carrito[result].count+=1
          this.carrito[result].totalprice=(this.carrito[result].count*this.carrito[result].unitaryprice)
          this.carrito[result].totalpoints=(this.carrito[result].count*this.carrito[result].unitarypoints)
        }

      else{
        let data = this.products[produ]
        this.carrito.push({
          id:data?.id||"",
          name:data?.name||"",
          count:1,
          unitaryprice:data?.price||0,
          unitarypoints:data?.points ||0,
          totalpoints:data?.points||0,
          totalprice:data?.price||0,
        })
      }        
      this.pago.total+=this.products[produ].price
      this.pago.point+=this.products[produ].points
      this.products[produ].count-=1
    }


    }

    eliminar(id:string){
      let result = this.carrito.findIndex(x=>x.id==id)
      let produ= this.products.findIndex(x=>x.id==id)

      this.pago.total-=this.carrito[result].unitaryprice
      this.pago.point-=this.carrito[result].unitarypoints

      if(this.carrito[result].count>1){
          this.carrito[result].count-=1
          this.products[produ].count+=1
          this.carrito[result].totalprice=(this.carrito[result].count*this.carrito[result].unitaryprice)
          this.carrito[result].totalpoints=(this.carrito[result].count*this.carrito[result].unitarypoints)

      }else{
        this.products[produ].count+=1
        this.carrito.splice(result,result+1)
      }
    }


    cliente:Clients=new Clients()
    stado:boolean=true
    //! Cliente
    searchclient(){
      console.log(this.cliente)
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

    buy(op:number){
      const tiempoTranscurrido = Date.now();
      let hoy = new Date(tiempoTranscurrido);
      let fecha = hoy.toLocaleDateString();
      let hora = `${hoy.getHours()}:${hoy.getMinutes()}`
      var client={
        "id": this.cliente._id,
        "dni": this.cliente.dni,
        "name": this.cliente.name,
      };
      if(this.cliente._id==""){
        client={
          "id": "0",
          "dni": 0,
          "name": "DEFAULT",
        };
      }

      const option=op
      const shopid=localStorage.getItem("shop")||"a"

      const totalprice=this.pago.total
      const totalpoints=this.pago.total




      let sal = new Sales(undefined,hora,client,undefined,fecha,this.carrito,undefined,totalprice,totalpoints,shopid,option)
      delete sal._id
      delete sal.employee
      console.log(sal)
      this.salesService.postSales(sal,shopid).subscribe(res=>{
        if(option==0){
          let data={
            "tienda":res.tienda, 
            "total":res.total, 
            "id":res.id, 
            "correo":res.correo
          }
          this.pdfService.postPdf(data,shopid).subscribe(r=>{
            this.actualizar()
            this.carrito=[]
            this.Modal1()
          })
        }else if(option==1){
          this.pdfService.getPdf(shopid,res.id).subscribe(r=>{
            const fileURL = URL.createObjectURL(r);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'archivo.pdf';
            link.target = '_blank';
            link.click();
            URL.revokeObjectURL(fileURL);
            this.actualizar()
            this.carrito=[]
            this.Modal1()
          })
        }


      })
    }

  
}
