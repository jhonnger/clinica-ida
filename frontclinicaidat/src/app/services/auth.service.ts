import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  login(datos: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/auth/login', datos, { headers });
  }
}
