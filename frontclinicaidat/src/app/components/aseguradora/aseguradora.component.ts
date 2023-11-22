import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspecialidadService} from "../../services/especialidad.service";
import {catchError, tap, throwError} from "rxjs";
import {AseguradoraService} from "../../services/aseguradora.service";

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.css']
})
export class AseguradoraComponent {

  formulario: FormGroup;
  idSeleccionado: number = -1;
  aseguradora:any[] = [];

  displayedColumns: string[] = ['id', 'nombre'];

  constructor(
    private fb:FormBuilder,
    private aseguradoraService: AseguradoraService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.listarAseguradora();
  }

  listarAseguradora(){
    this.aseguradoraService.listarAseguradoras().subscribe((data: any) => {
      this.aseguradora = data;
      console.log(data)
    })
  }

  cargarDatos(element: any){
    this.idSeleccionado = element.id;
    console.log(this.idSeleccionado);
    console.log(element);
    this.formulario.setValue({
      nombre: element.nombre,
    })
  }

  enviarGuardar(){
    let aseguradora = this.formulario.value;
    const idAseguradoraSeleccionado = this.formulario.value.id;
    aseguradora.id = this.aseguradora.find(r => r.id === idAseguradoraSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, aseguradora);
    } else {
      this.guardar(aseguradora);
    }
  }

  guardar(aseguradora: any) {
    this.listarAseguradora();
    this.aseguradoraService.guardarAseguradora({
      ...aseguradora
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarAseguradora();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  actualizar(idAseguradora: number, aseguradora: any){
    aseguradora.id = idAseguradora;
    this.aseguradoraService.actualizarAseguradora({
      ...aseguradora
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarAseguradora();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  eliminar() {
    this.aseguradoraService.eliminarAseguradora(this.idSeleccionado).pipe(
      tap((data) => {
        console.log(data);
        this.listarAseguradora();
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
