import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {RolService} from "../../services/rol.service";
import {EspecialidadService} from "../../services/especialidad.service";
import {catchError, tap, throwError} from "rxjs";
import {CrudBase} from "../CrudBase";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent extends CrudBase{

  @ViewChild('formDirective')
  override formDirective!: FormGroupDirective;
  especialidad:any[] = [];

  displayedColumns: string[] = ['id', 'nombre','action'];

  constructor(
    public override fb:FormBuilder,
    public dialog: MatDialog,
    private especialidadService: EspecialidadService) {
    super(fb)
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.listarEspecialidad();
  }

  listarEspecialidad(){
    this.especialidadService.listarEspecialidades().subscribe((data: any) => {
      this.especialidad = data;
    })
  }

  cargarDatos(element: any){
    this.idSeleccionado = element.id;
    this.formulario.setValue({
      nombre: element.nombre,
    })
  }

  enviarGuardar(){
    let especialidad = this.formulario.value;
    const idEspecialidadSeleccionado = this.formulario.value.id;
    especialidad.id = this.especialidad.find(r => r.id === idEspecialidadSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, especialidad);
    } else {
      this.guardar(especialidad);
    }
  }

  guardar(especialidad: any) {
    if (this.formulario.valid){
      this.especialidadService.guardarEspecialidad({
        ...especialidad
      }).pipe(
        tap( (data) => {
          this.cancelar();
          this.listarEspecialidad();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }

  }

  actualizar(idEspecialidad: number, especialidad: any){
    especialidad.id = idEspecialidad;
    this.especialidadService.actualizarEspecialidad({
      ...especialidad
    }).pipe(
      tap( (data) => {
        this.cancelar();
        this.listarEspecialidad();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  mostrarConfirmarEliminar(item: any){
    this.dialog.open(ModalConfirmComponent,{data: {
        mensaje: ' la especialidad '+ item.nombre + ' ' + item.apellido
      }})
      .afterClosed()
      .subscribe(data => {
        if(data){
          this.eliminar(item.id)
        }
      })
  }

  eliminar(id: any) {
    this.especialidadService.eliminarEspecialidad(id).pipe(
      tap((data) => {
        this.listarEspecialidad();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe();
  }



}
