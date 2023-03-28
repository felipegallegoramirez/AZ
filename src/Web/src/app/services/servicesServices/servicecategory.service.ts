import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { ServiceCategory } from "../../models/modelsServices/servicecategory";

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  selectedServiceCategory: ServiceCategory;
  servicecategorys: ServiceCategory[] = [];
  readonly URL_API = "http://localhost:3000/api/servicecategory";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedServiceCategory = new ServiceCategory();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postServiceCategory(servicecategory: ServiceCategory) {
    return this.http.post<ServiceCategory>(this.URL_API, servicecategory,this.httpOptions);
  }

  getServiceCategorys(idshop:string) {
    return this.http.get<ServiceCategory[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getServiceCategory(id:string,idshop:string) {
    return this.http.get<ServiceCategory>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putServiceCategory(servicecategory: ServiceCategory,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,servicecategory,this.httpOptions);
  }

  deleteServicecategory(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}