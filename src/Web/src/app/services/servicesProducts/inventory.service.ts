import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Inventory } from "../../models/modelsProducts/inventory";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  selectedInventory: Inventory;
  inventorys: Inventory[] = [];
  readonly URL_API = `${environment.backend}/api/inventory`;
  token = localStorage.getItem('token');
  shopid = localStorage.getItem('shop');

  constructor(private http: HttpClient) {
    this.selectedInventory = new Inventory();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };

  // * Esto necesita optimizacion en el futuro
  getProductSearch(select:string,actpage:number,size:number,param:string,order:number,category:string) {
    /*
    const search = req.query.search || "";
    const actpage = req.query.actpage || 1;
    const size = req.query.size || 1000;
    const param= req.query.param || "code";
    const order= req.query.order || 1;
    */
  //Todo category -> <- resto
    return this.http.get<Inventory[]>(this.URL_API + `/${this.shopid}?search=${select}&actpage=${actpage}&size=${size}&param=${param}&order=${order}&category=${category}`,this.httpOptions);
  }


  postInventory(inventory: Inventory) {
    inventory.shopid =this.shopid || ""
    return this.http.post<Inventory>(this.URL_API + `/${this.shopid}/`, inventory,this.httpOptions);
  }

  postInventoryI(inventory: Inventory,file:File) {
    console.log(inventory)
    const fd = new FormData();
    fd.append('code', inventory.code || "");
    fd.append('category',inventory.category || "");
    fd.append('count', inventory.count?.toString() || "");
    fd.append('points', inventory.points?.toString() || "");
    fd.append('price', inventory.price?.toString() || "");
    fd.append('productname', inventory.productname || "");
    fd.append('shopid', this.shopid || "");
    fd.append('images', file);
    return this.http.post<Inventory>(this.URL_API+ `/i/${this.shopid}/`, fd,this.httpOptions);
  }

  getInventorys() {
    return this.http.get<Inventory[]>(this.URL_API + `/any/${this.shopid}/`,this.httpOptions);
  }
  getInventory(id:string) {
    return this.http.get<Inventory>(this.URL_API + `/one/${this.shopid}/${id}`,this.httpOptions);
  }

  getInventorysOnline(id:string) {
    return this.http.get<Inventory[]>(this.URL_API + `/online/${id}/`);
  }

  putInventory(inventory: Inventory,id:string) {
    inventory.shopid =this.shopid || ""
    return this.http.put(this.URL_API + `/${this.shopid}/${id}`,inventory,this.httpOptions);
  }
  putInventoryI(inventory: Inventory,file:File,id:string) {
    const fd = new FormData();
    fd.append('code', inventory.code || "");
    fd.append('category',inventory.category || "");
    fd.append('count', inventory.count?.toString() || "");
    fd.append('points', inventory.points?.toString() || "");
    fd.append('price', inventory.price?.toString() || "");
    fd.append('productname', inventory.productname || "");
    fd.append('shopid', this.shopid || "");
    fd.append('image',inventory.image || "");
    fd.append('images', file);
    return this.http.put<Inventory>(this.URL_API+`/i/${this.shopid}/${id}`, fd,this.httpOptions);
  }

  deleteInventory(id: string) {
    return this.http.delete(this.URL_API + `/${this.shopid}/${id}`,this.httpOptions);
  }

  
}