import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { OnlineSale } from "../models/online-sale";

@Injectable({
  providedIn: 'root'
})
export class OnlineSalesService {
  selectedOnlineSale: OnlineSale;
  onlineSales: OnlineSale[] = [];
  readonly URL_API = "http://localhost:3000/api/onlineSale";
  
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };



  constructor(private http: HttpClient) {
    this.selectedOnlineSale = new OnlineSale();
  }

  postOnlineSale(onlineSale: OnlineSale,idshop:string) {
    return this.http.post<OnlineSale>(this.URL_API+ `/${idshop}`, onlineSale);
  }

  getOnlineSales(idshop:string) {
    return this.http.get<OnlineSale[]>(this.URL_API+ `/${idshop}`,this.httpOptions);
  }

  getOnlineSale(id:string,idshop:string) {
    return this.http.get<OnlineSale>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putOnlineSale(onlineSale: OnlineSale,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${id}/${idshop}`,onlineSale,this.httpOptions);
  }

  deleteOnlineSale(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }
  getOnlineSaleSearch(select:string,actpage:number,size:number,param:string,order:number,shopid:string) {
    return this.http.get(this.URL_API + `/${shopid}?search=${select}&actpage=${actpage}&size=${size}&param=${param}&order=${order}`,this.httpOptions);
  }
}
