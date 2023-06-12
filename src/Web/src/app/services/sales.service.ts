import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Sales } from "../models/sales";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  selectedSales: Sales;
  saless: Sales[] = [];
  readonly URL_API = "http://localhost:3000/api/sales";
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
    return this.http.post<Sales>(this.URL_API+ `/${idshop}`, sales,this.httpOptions);
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

  
}