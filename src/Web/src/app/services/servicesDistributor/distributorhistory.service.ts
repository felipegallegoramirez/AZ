import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { DistributorHistory } from 'src/app/models/modelsDistributor/distributorhistory';

@Injectable({
  providedIn: 'root'
})
export class DistributorHistoryService {
  selectedDistributorHistory: DistributorHistory;
  distributorHistorys: DistributorHistory[] = [];
  readonly URL_API = "http://localhost:3000/api/distributorHistory";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedDistributorHistory = new DistributorHistory();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postDistributorHistory(distributorHistory: DistributorHistory,idshop:string) {
    return this.http.post<any>(this.URL_API+ `/${idshop}`, distributorHistory,this.httpOptions);
  }

  getDistributorHistorys(idshop:string) {
    return this.http.get<DistributorHistory[]>(this.URL_API + `/${idshop}`,this.httpOptions);
  }
  getDistributorHistory(id:string,idshop:string) {
    return this.http.get<DistributorHistory>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putDistributorHistory(distributorHistory: DistributorHistory,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,distributorHistory,this.httpOptions);
  }

  deleteDistributorHistory(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }
  getDistributorHistorySearch(select:string,actpage:number,size:number,param:string,order:number,shopid:string) {
    return this.http.get(this.URL_API + `/${shopid}?search=${select}&actpage=${actpage}&size=${size}&param=${param}&order=${order}`,this.httpOptions);
  }
}
