import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AseguradoraService {

  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  listarAseguradoras() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/aseguradora/listar',  { headers });
  }


  guardarAseguradora(aseguradora:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/aseguradora/guardar', aseguradora,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );;
  }

  actualizarAseguradora(aseguradora:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.apiUrl + '/aseguradora/actualizar', aseguradora,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  eliminarAseguradora(id: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.apiUrl + '/aseguradora/eliminar/'+ id,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );;
  }
}
