import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Clients } from "../models/clients";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  selectedClients: Clients;
  clientss: Clients[] = [];
  readonly URL_API = "http://localhost:3000/api/clients";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedClients = new Clients();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postClients(clients: Clients) {
    return this.http.post<Clients>(this.URL_API, clients,this.httpOptions);
  }

  getClientss(idshop:string) {
    return this.http.get<Clients[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getClients(id:string,idshop:string) {
    return this.http.get<Clients>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putClients(clients: Clients,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,clients,this.httpOptions);
  }

  deleteClients(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}