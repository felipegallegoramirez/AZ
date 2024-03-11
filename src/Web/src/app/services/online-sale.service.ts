import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { OnlineSale } from "../models/online-sale";

@Injectable({
  providedIn: 'root'
})
export class OnlineSalesService {
  selectedOnlineSale: OnlineSale;
  onlineSales: OnlineSale[] = [];
  readonly URL_API = "http://localhost:3000/api/onlineSale";


  constructor(private http: HttpClient) {
    this.selectedOnlineSale = new OnlineSale();
  }

  postOnlineSale(onlineSale: OnlineSale,idshop:string) {
    return this.http.post<OnlineSale>(this.URL_API+ `/${idshop}`, onlineSale);
  }

  getOnlineSales(idshop:string) {
    return this.http.get<OnlineSale[]>(this.URL_API+ `/${idshop}`);
  }

  getOnlineSale(id:string,idshop:string) {
    return this.http.get<OnlineSale>(this.URL_API + `/${idshop}/${id}` );
  }

  putOnlineSale(onlineSale: OnlineSale,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${id}/${idshop}`,onlineSale );
  }

  deleteOnlineSale(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}` );
  }
}
