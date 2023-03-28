import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[] = [];
  readonly URL_API = "http://localhost:3000/api/user";
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };




  postUser(user: User) {
    return this.http.post<User>(this.URL_API, user,this.httpOptions);
  }

  getUsers() {
    return this.http.get<User[]>(this.URL_API,this.httpOptions);
  }
  getUser(id:string,idshop:string) {
    return this.http.get<User>(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  putUser(user: User,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,user,this.httpOptions);
  }

  deleteUser(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}`,this.httpOptions);
  }

  
}