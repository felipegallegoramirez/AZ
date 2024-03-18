import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly URL_API = `${environment.backend}/api/auth`;

  constructor(private http: HttpClient) {
  }






  postAuth(data: any) {
    return this.http.post<any>(this.URL_API, data);
  }
  postAuthCode(data: any,id:string) {
    return this.http.post<any>(this.URL_API+`/${id}`, data);
  }



  
}