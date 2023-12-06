import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PacienteService} from "../../services/paciente.service";
import {RolService} from "../../services/rol.service";
import {catchError, tap, throwError} from "rxjs";
import {CrudBase} from "../CrudBase";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent extends CrudBase{

  rol:any[] = [];
  @ViewChild('formDirective')
  override formDirective!: FormGroupDirective;
  displayedColumns: string[] = ['id', 'descripcion'];

  constructor(
    public override fb:FormBuilder,
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
          console.log(data);
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



}
