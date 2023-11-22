import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {RolService} from "../../services/rol.service";
import {AuthService} from "../../services/auth.service";
import {UsuarioService} from "../../services/usuario.service";
import {catchError, tap, throwError} from "rxjs";
import {ModalConfirmComponent} from "../modal-confirm/modal-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  formulario: FormGroup;
  idSeleccionado: number = -1;
  roles: any[] = [];
  usuarios: any[] = [];
  sexos: any[] = ["F", "M"];

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'sexo', 'celular', 'dni', 'login','action'];

  constructor(private fb: FormBuilder,
              private rolService: RolService,
              public dialog: MatDialog,
              private usuarioService: UsuarioService,
              private authService: AuthService) {
    this.listarRoles();
    this.listarUsuarios();
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
      password: ['', Validators.required],
      sexo: ['', Validators.required],
      login: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }


  listarRoles(){
    this.rolService.listarRoles().subscribe((data: any)=> {
      this.roles = data;
      console.log(data);
    })
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data)
    })
  }

  mostrarConfirmarEliminar(item: any){
    this.dialog.open(ModalConfirmComponent,{data: {
        mensaje: ' al usuario '+ item.nombre + ' ' + item.apellido
      }})
      .afterClosed()
      .subscribe(data => {
        if(data){
          this.eliminar(item.id)
        }
      })
  }
  cargarDatos(element: any){

    this.idSeleccionado = element.id;
    console.log(this.idSeleccionado);
    console.log(element);
    this.formulario.setValue({
      //usuario: element.login,
      password: element.password,
      apellido: element.apellido,
      celular: element.celular,
      rol: element.rol.id,
      nombre: element.nombre,
      dni: element.dni,
      sexo: element.sexo,
      login: element.login,
    })
  }

  enviarGuardar(){
    let usuario = this.formulario.value;
    const idRolSeleccionado = this.formulario.value.rol;
    usuario.rol =  this.roles.find(r => r.id === idRolSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, usuario);
    } else {
      this.guardar(usuario);
    }
  }

  guardar(usuario: any) {
    if (this.formulario.valid){
      this.usuarioService.guardarUsuario({
        ...usuario
      }).pipe(
        tap( (data) => {
          console.log(data);
          this.listarUsuarios();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }
  }

  actualizar(idUsuario: number, usuario: any){
    usuario.id = idUsuario;
    this.usuarioService.actualizarUsuario({...usuario})
      .pipe(
        tap( (data) => {
          console.log(data);
          this.listarUsuarios();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
  }

  eliminar(id: any) {
    this.usuarioService.eliminarUsuario(id).pipe(
      tap( (data) => {
        this.listarUsuarios();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  cancelar() {
    this.idSeleccionado = -1;
    this.resetForm();
    if (this.formDirective)
      this.formDirective.resetForm()
  }

  resetForm() {
    this.formulario.reset();
  }

}
