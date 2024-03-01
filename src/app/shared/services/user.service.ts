import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel, UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  credentials$: number;
  errorMessage: String = "HttpError";
  private rurl = "/registration";
  private lurl = "/login";

  setCredential(value: any) {
    sessionStorage.setItem('userId', value);
  }
  getCredential(){
    return sessionStorage.getItem('userId');
  }
  clearCredential(){
    sessionStorage.removeItem('userId');
  }
  constructor(private http: HttpClient) { }
  public RegisterUser(user: UserModel): Observable<number> {
    return this.http.post<number>(environment.apiUrl + this.rurl, user);
  }
  public LoginUser(user: LoginModel): Observable<number> {
    return this.http.post<number>(environment.apiUrl + this.lurl, user);
  }
}

