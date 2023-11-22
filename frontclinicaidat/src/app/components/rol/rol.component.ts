import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PacienteService} from "../../services/paciente.service";
import {RolService} from "../../services/rol.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent {

  formulario: FormGroup;
  idSeleccionado: number = -1;
  rol:any[] = [];

  displayedColumns: string[] = ['id', 'descripcion'];

  constructor(
    private fb:FormBuilder,
    private rolService: RolService) {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.listarRoles();
  }

  listarRoles(){
    this.rolService.listarRoles().subscribe((data: any) => {
      this.rol = data;
      console.log(data)
    })
  }

  cargarDatos(element: any){
    this.idSeleccionado = element.id;
    console.log(this.idSeleccionado);
    console.log(element);
    this.formulario.setValue({
      descripcion: element.descripcion,
    })
  }

  enviarGuardar(){
    let rol = this.formulario.value;
    const idRolSeleccionado = this.formulario.value.id;
    rol.id = this.rol.find(r => r.id === idRolSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, rol);
    } else {
      this.guardar(rol);
    }
  }

  guardar(rol: any) {
    this.listarRoles();
    this.rolService.guardarRol({
      ...rol
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarRoles();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  actualizar(idRol: number, rol: any){
    rol.id = idRol;
    this.rolService.actualizarRol({
      ...rol
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarRoles();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  eliminar() {
    this.rolService.eliminarRol(this.idSeleccionado).pipe(
      tap((data) => {
        console.log(data);
        this.listarRoles();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe();
  }

  cancelar() {
    this.idSeleccionado = -1;
    this.resetForm();
  }

  resetForm() {
    this.formulario.reset();
  }

}
