import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  readonly URL_API = "http://localhost:3000/api/pdf";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };

  getPdf(idshop:string,id:string) {
    const headers= new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
    return this.http.get(this.URL_API+ `/${idshop}/${id}`,{ headers, responseType: 'blob' });
  }
  postPdf(data: any,idshop:string) {
    return this.http.post(this.URL_API+ `/${idshop}`,data,this.httpOptions);
  }

}
