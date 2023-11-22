import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  listarEspecialidades() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/especialidad/listar',  { headers });
  }

  guardarEspecialidad(especialidad:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/especialidad/guardar', especialidad,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );;
  }

  actualizarEspecialidad(especialidad:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.apiUrl + '/especialidad/actualizar', especialidad,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  eliminarEspecialidad(id: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.apiUrl + '/especialidad/eliminar/'+ id,  { headers })
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
