import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  listarPaciente() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/paciente/listar',  { headers });
  }

  guardarPaciente(paciente:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/paciente/guardar', paciente,  { headers })
  .pipe(
      map( (res: any) => {
        return res;
      }),
      catchError( err => {
        return throwError(err);
      })
    );;
  }

  actualizarPaciente(paciente:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.apiUrl + '/paciente/actualizar', paciente,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  eliminarPaciente(id: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.apiUrl + '/paciente/eliminar/'+ id,  { headers })
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
