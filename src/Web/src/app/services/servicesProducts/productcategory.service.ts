import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { ProductCategory } from "../../models/modelsProducts/productcategory";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  selectedProductCategory: ProductCategory;
  productcategorys: ProductCategory[] = [];
  readonly URL_API = `${environment.backend}/api/productcategory`
  token = localStorage.getItem('token');
  shopid = localStorage.getItem('shop');

  constructor(private http: HttpClient) {
    this.selectedProductCategory = new ProductCategory();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postProductCategory(productcategory: ProductCategory) {
    return this.http.post<ProductCategory>(this.URL_API+ `/${this.shopid}/`, productcategory,this.httpOptions);
  }
  postProductCategoryI(productcategory: ProductCategory,file:File) {
    const fd = new FormData();
    fd.append('name', productcategory.name || "");
    fd.append('shopid', this.shopid || "");
    fd.append('images', file);
    return this.http.post<ProductCategory>(this.URL_API+ `/i/${this.shopid}/`, fd,this.httpOptions);
  }



  getProductCategorys() {
    return this.http.get<ProductCategory[]>(this.URL_API + `/${this.shopid}/`,this.httpOptions);
  }



  getProductCategory(id:string) {
    return this.http.get<ProductCategory>(this.URL_API + `/${this.shopid}/${id}`,this.httpOptions);
  }

  putProductCategory(productcategory: ProductCategory,id:string) {
    return this.http.put(this.URL_API + `/${this.shopid}/${id}`,productcategory,this.httpOptions);
  }

  putProductCategoryI(productcategory: ProductCategory,id:string,file:File) {
    const fd = new FormData();
    fd.append('name', productcategory.name || "");
    fd.append('image', productcategory.image || "");
    fd.append('shopid', productcategory.shopid || this.shopid || "");
    fd.append('images', file);
    return this.http.put(this.URL_API + `/i/${this.shopid}/${id}`,fd,this.httpOptions);
  }

  deleteProductCategory(id: string) {
    return this.http.delete(this.URL_API + `/${this.shopid}/${id}`,this.httpOptions);
  }

  
}