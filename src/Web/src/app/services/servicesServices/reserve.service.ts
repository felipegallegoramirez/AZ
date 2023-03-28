import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Reserve } from "../../models/modelsServices/reserve";

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  selectedReserve: Reserve;
  reserves: Reserve[] = [];
  readonly URL_API = "http://localhost:3000/api/reserve";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedReserve = new Reserve();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postReserve(reserve: Reserve) {
    return this.http.post<Reserve>(this.URL_API, reserve,this.httpOptions);
  }

  getReserves(idshop:string) {
    return this.http.get<Reserve[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getReserve(id:string,idshop:string) {
    return this.http.get<Reserve>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putReserve(reserve: Reserve,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,reserve,this.httpOptions);
  }

  deleteReserve(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}