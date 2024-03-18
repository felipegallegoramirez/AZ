import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Sales } from "../models/sales";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  selectedSales: Sales;
  saless: Sales[] = [];
  readonly URL_API = `${environment.backend}/api/sales`;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedSales = new Sales();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postSales(sales: Sales,idshop:string) {
    return this.http.post<any>(this.URL_API+ `/${idshop}`, sales,this.httpOptions);
  }

  getSaless(idshop:string) {
    return this.http.get<Sales[]>(this.URL_API + `/${idshop}`,this.httpOptions);
  }
  getSales(id:string,idshop:string) {
    return this.http.get<Sales>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putSales(sales: Sales,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,sales,this.httpOptions);
  }

  deleteSales(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }
  getSalesSearch(select:string,actpage:number,size:number,param:string,order:number,shopid:string) {
    return this.http.get(this.URL_API + `/${shopid}?search=${select}&actpage=${actpage}&size=${size}&param=${param}&order=${order}`,this.httpOptions);
  }

  
}