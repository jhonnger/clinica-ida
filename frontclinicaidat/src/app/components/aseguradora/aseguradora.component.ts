import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EspecialidadService} from "../../services/especialidad.service";
import {catchError, tap, throwError} from "rxjs";
import {AseguradoraService} from "../../services/aseguradora.service";
import {CrudBase} from "../CrudBase";
import {ModalConfirmComponent} from "../modal-confirm/modal-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.css']
})
export class AseguradoraComponent extends CrudBase{

  aseguradora:any[] = [];
  @ViewChild('formDirective')
  override formDirective!: FormGroupDirective;
  displayedColumns: string[] = ['id', 'nombre','action'];

  constructor(
    public override fb:FormBuilder,
    public dialog: MatDialog,
    private aseguradoraService: AseguradoraService) {
    super(fb)
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
    if (this.formulario.valid){
      this.aseguradoraService.guardarAseguradora({
        ...aseguradora
      }).pipe(
        tap( (data) => {
          this.cancelar();
          this.listarAseguradora();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }

  }

  actualizar(idAseguradora: number, aseguradora: any){
    aseguradora.id = idAseguradora;
    this.aseguradoraService.actualizarAseguradora({
      ...aseguradora
    }).pipe(
      tap( (data) => {
        this.cancelar();
        this.listarAseguradora();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  eliminar(id: any) {
    this.aseguradoraService.eliminarAseguradora(id).pipe(
      tap((data) => {
        this.listarAseguradora();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe();
  }

  mostrarConfirmarEliminar(item: any){
    this.dialog.open(ModalConfirmComponent,{data: {
        mensaje: ' la aseguradora '+ item.nombre + ' ' + item.apellido
      }})
      .afterClosed()
      .subscribe(data => {
        if(data){
          this.eliminar(item.id)
        }
      })
  }

}
