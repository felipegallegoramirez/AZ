import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly URL_API = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) {
  }






  postAuth(data: any) {
    return this.http.post<any>(this.URL_API, data);
  }
  postAuthCode(data: any,id:string) {
    return this.http.post<any>(this.URL_API+`/${id}`, data);
  }



  
}