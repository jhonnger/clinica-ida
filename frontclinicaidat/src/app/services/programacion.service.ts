import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {

  apiUrl = "http://localhost:8089"
  constructor(private http: HttpClient) { }

  listarEspecialidades() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/especialidad/listar',  { headers });
  }

  guardarProgramacion(programacion:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/programacion/guardar', programacion,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  buscarProgramacion(programacion:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/programacion/buscar', programacion,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
  }

  listarTurnos(filtro:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + '/programacion/buscarTurnos', filtro,  { headers })
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError( err => {
          return throwError(err);
        })
      );
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
