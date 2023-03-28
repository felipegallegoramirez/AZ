import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { WorkStation } from "../../models/modelsServices/workstation";

@Injectable({
  providedIn: 'root'
})
export class WorkStationService {
  selectedWorkStation: WorkStation;
  workstations: WorkStation[] = [];
  readonly URL_API = "http://localhost:3000/api/workstation";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedWorkStation = new WorkStation();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postWorkStation(workstation: WorkStation) {
    return this.http.post<WorkStation>(this.URL_API, workstation,this.httpOptions);
  }

  getWorkStations(idshop:string) {
    return this.http.get<WorkStation[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getWorkStation(id:string,idshop:string) {
    return this.http.get<WorkStation>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putWorkStation(workstation: WorkStation,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,workstation,this.httpOptions);
  }

  deleteWorkStation(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}