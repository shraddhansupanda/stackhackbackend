import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private _registerUrl='http://localhost:3000/api/'
    
  constructor( private http: HttpClient) { }
  
  registerUser(user){
    return this.http.post<any>(this._registerUrl+'register',user)
  }
  loginUser(user){
    return this.http.post<any>(this._registerUrl+'login',user)
  }
  loggedIn( ){
    return !!localStorage.getItem('token')
  }
}
