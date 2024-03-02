import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BetModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  credentials$: number;
  errorMessage: String = "HttpError";
  private url = "/bet";

  constructor(private http: HttpClient) { }

  public BetUser(bet: BetModel): Observable<number> {
    return this.http.post<number>(environment.apiUrl + this.url, bet);
  }
}

