import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Distributor } from 'src/app/models/modelsDistributor/distributor';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  selectedDistributor: Distributor;
  distributors: Distributor[] = [];
  readonly URL_API = "http://localhost:3000/api/distributor";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedDistributor = new Distributor();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postDistributor(distributor: Distributor,idshop:string) {
    return this.http.post<any>(this.URL_API+ `/${idshop}`, distributor,this.httpOptions);
  }

  getDistributors(idshop:string) {
    return this.http.get<Distributor[]>(this.URL_API + `/${idshop}`,this.httpOptions);
  }
  getDistributor(id:string,idshop:string) {
    return this.http.get<Distributor>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putDistributor(distributor: Distributor,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,distributor,this.httpOptions);
  }

  deleteDistributor(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }
  getDistributorSearch(select:string,actpage:number,size:number,param:string,order:number,shopid:string) {
    return this.http.get(this.URL_API + `/${shopid}?search=${select}&actpage=${actpage}&size=${size}&param=${param}&order=${order}`,this.httpOptions);
  }
}
