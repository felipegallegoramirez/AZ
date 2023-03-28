import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Inventory } from "../../models/modelsProducts/inventory";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  selectedInventory: Inventory;
  inventorys: Inventory[] = [];
  readonly URL_API = "http://localhost:3000/api/inventory";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedInventory = new Inventory();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postInventory(inventory: Inventory) {
    return this.http.post<Inventory>(this.URL_API, inventory,this.httpOptions);
  }

  getInventorys(idshop:string) {
    return this.http.get<Inventory[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getInventory(id:string,idshop:string) {
    return this.http.get<Inventory>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putInventory(inventory: Inventory,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,inventory,this.httpOptions);
  }

  deleteInventory(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}