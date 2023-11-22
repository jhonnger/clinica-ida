import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  listarCita() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/cita/listar',  { headers });
  }

  guardarCita(cita:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/cita/guardar', cita,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );;
  }

  actualizarCita(cita:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.apiUrl + '/cita/actualizar', cita,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  eliminarCita(id: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.apiUrl + '/cita/eliminar/'+ id,  { headers })
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
