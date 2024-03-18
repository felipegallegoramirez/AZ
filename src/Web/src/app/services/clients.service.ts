import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Clients } from "../models/clients";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  selectedClients: Clients;
  clientss: Clients[] = [];
  readonly URL_API = `${environment.backend}/api/clients`;
  token = localStorage.getItem('token');
  shopid = localStorage.getItem('shop');
  constructor(private http: HttpClient) {
    this.selectedClients = new Clients();
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };


  getClientSearch(select:string,actpage:number,size:number,param:string,order:number) {
    /*
    const search = req.query.search || "";
    const actpage = req.query.actpage || 1;
    const size = req.query.size || 1000;
    const param= req.query.param || "code";
    const order= req.query.order || 1;
    */
  //Todo category -> <- resto
    return this.http.get<Clients[]>(this.URL_API + `/${this.shopid}?search=${select}&actpage=${actpage}&size=${size}&param=${param}&order=${order}`,this.httpOptions);
  }

  postClients(clients: Clients) {
    clients.shopid=this.shopid||""
    return this.http.post<Clients>(this.URL_API+ `/${this.shopid}/`, clients,this.httpOptions);
  }

  getClientss() {
    return this.http.get<Clients[]>(this.URL_API + `/${this.shopid}/`,this.httpOptions);
  }
  getClients(id:string) {
    return this.http.get<Clients>(this.URL_API + `/${this.shopid}/${id}`,this.httpOptions);
  }

  putClients(clients: Clients,id:string) {
    clients.shopid=this.shopid||""
    return this.http.put(this.URL_API + `/${this.shopid}/${id}`,clients,this.httpOptions);
  }

  deleteClients(id: string) {
    return this.http.delete(this.URL_API + `/${this.shopid}/${id}`,this.httpOptions);
  }

  
}