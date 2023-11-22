import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  listarMedico() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/medico/listar',  { headers });
  }

  guardarMedico(medico:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/medico/guardar', medico,  { headers }).pipe(
      map( (res: any) => {
        return res;
      }),
      catchError( err => {
        return throwError(err);
      })
    );;
  }

  actualizarMedico(medico:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.apiUrl + '/medico/actualizar', medico,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  eliminarMedico(id: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.apiUrl + '/medico/eliminar/'+ id,  { headers }) .pipe(
      map( (res: any) => {
        return res;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }

}
