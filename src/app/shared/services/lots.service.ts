import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LotsModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class LotsService {
  errorMessage: String = "HttpError";
  private url = "/getLots";
  constructor(private http: HttpClient) { }
  getLots(): Observable<LotsModel[]> {
    return this.http.get<LotsModel[]>(environment.apiUrl + this.url);
  }
}
