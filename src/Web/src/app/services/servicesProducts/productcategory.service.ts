import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { ProductCategory } from "../../models/modelsProducts/productcategory";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  selectedProductCategory: ProductCategory;
  productcategorys: ProductCategory[] = [];
  readonly URL_API = "http://localhost:3000/api/productcategory";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedProductCategory = new ProductCategory();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postProductCategory(productcategory: ProductCategory) {
    return this.http.post<ProductCategory>(this.URL_API, productcategory,this.httpOptions);
  }

  getProductCategorys(idshop:string) {
    return this.http.get<ProductCategory[]>(this.URL_API + `/${idshop}/`,this.httpOptions);
  }
  getProductCategory(id:string,idshop:string) {
    return this.http.get<ProductCategory>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putProductCategory(productcategory: ProductCategory,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,productcategory,this.httpOptions);
  }

  deleteProductCategory(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}