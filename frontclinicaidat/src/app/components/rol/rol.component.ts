import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PacienteService} from "../../services/paciente.service";
import {RolService} from "../../services/rol.service";
import {catchError, tap, throwError} from "rxjs";
import {CrudBase} from "../CrudBase";
import {ModalConfirmComponent} from "../modal-confirm/modal-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent extends CrudBase{

  rol:any[] = [];
  @ViewChild('formDirective')
  override formDirective!: FormGroupDirective;
  displayedColumns: string[] = ['id', 'descripcion','action'];

  constructor(
    public override fb:FormBuilder,
    public dialog: MatDialog,
    private rolService: RolService) {
    super(fb)
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
    if (this.formulario.valid){
      this.rolService.guardarRol({
        ...rol
      }).pipe(
        tap( (data) => {
          this.cancelar();
          this.listarRoles();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }

  }

  actualizar(idRol: number, rol: any){
    rol.id = idRol;
    this.rolService.actualizarRol({
      ...rol
    }).pipe(
      tap( (data) => {
        this.cancelar();
        this.listarRoles();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  mostrarConfirmarEliminar(item: any){
    this.dialog.open(ModalConfirmComponent,{data: {
        mensaje: ' el rol '+ item.nombre
      }})
      .afterClosed()
      .subscribe(data => {
        if(data){
          this.eliminar(item.id)
        }
      })
  }
  eliminar(id: any) {
    this.rolService.eliminarRol(id).pipe(
      tap((data) => {
        this.listarRoles();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe();
  }



}
