import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Service } from "../../models/modelsServices/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  selectedService: Service;
  services: Service[] = [];
  readonly URL_API = "http://localhost:3000/api/service";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedService = new Service();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postService(service: Service) {
    return this.http.post<Service>(this.URL_API, service,this.httpOptions);
  }

  getServices(idshop:string) {
    return this.http.get<Service[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getService(id:string,idshop:string) {
    return this.http.get<Service>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putService(service: Service,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,service,this.httpOptions);
  }

  deleteService(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}