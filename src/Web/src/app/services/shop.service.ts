import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Shop } from "../models/shop";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  selectedShop: Shop;
  shops: Shop[] = [];
  readonly URL_API = `${environment.backend}/api/shop`;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedShop = new Shop();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postShop(shop: Shop) {
    return this.http.post<Shop>(this.URL_API, shop,this.httpOptions);
  }

  getShops(idshop:string) {
    return this.http.get<Shop[]>(this.URL_API + `/${idshop}`,this.httpOptions);
  }
  getShop(id:string,idshop:string) {
    return this.http.get<Shop>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putShop(shop: Shop,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,shop,this.httpOptions);
  }

  deleteShop(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}