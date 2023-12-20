import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EspecialidadService} from "../../services/especialidad.service";
import {MedicoService} from "../../services/medico.service";
import {catchError, tap, throwError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit{

  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  formulario: FormGroup;
  idSeleccionado: number = -1;
  especialidades: any[] = [];
  medico:any[] = [];
  sexo: any[] = ["F", "M"];

  displayedColumns: string[] = ['id', 'nombre', 'apellido','sexo','celular' , 'dni','cmp','action'];

  constructor(
    private fb:FormBuilder,
    private especialidadService: EspecialidadService,
    public dialog: MatDialog,
    private medicoService: MedicoService) {
    this.listarMedicos()
    this.listarEspecialidades()
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
      cmp: ['', Validators.required],
      especialidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarMedicos();
  }

  listarEspecialidades(){
    this.especialidadService.listarEspecialidades().subscribe((data: any)=> {
      this.especialidades = data;
    })
  }

  listarMedicos(){
    this.medicoService.listarMedico().subscribe((data: any) => {
      this.medico = data;
      console.log(data)
    })
  }

  cargarDatos(element: any){
    this.idSeleccionado = element.id;
    console.log(this.idSeleccionado);
    console.log(element);
    this.formulario.setValue({
      nombre: element.nombre,
      apellido: element.apellido,
      direccion: element.direccion,
      fechanacimiento: element.fechanacimiento,
      sexo: element.sexo,
      celular: element.celular,
      dni: element.dni,
      cmp: element.cmp,
      especialidad: element.especialidad.id,
    })
  }

  mostrarConfirmarEliminar(item: any){
    this.dialog.open(ModalConfirmComponent,{data: {
      mensaje: ' al médico '+ item.nombre + ' ' + item.apellido
      }})
      .afterClosed()
      .subscribe(data => {
        if(data){
          this.eliminar(item.id)
        }
      })
  }

  enviarGuardar(){
    let medico = this.formulario.value;
    const idEspecialidadSeleccionado = this.formulario.value.especialidad;
    medico.especialidad = this.especialidades.find(r => r.id === idEspecialidadSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, medico);
    } else {
      this.guardar(medico);
    }
  }

  guardar(medico: any) {
    if (this.formulario.valid){
      this.medicoService.guardarMedico({
        ...medico
      }).pipe(
        tap( (data) => {
          console.log(data);
          this.listarMedicos();
          this.cancelar();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }

  }

  actualizar(idMedico: number, medico: any){
    if (this.formulario.valid){
      medico.id = idMedico;
      this.medicoService.actualizarMedico({
        ...medico
      }).pipe(
        tap( (data) => {
          this.listarMedicos();
          this.cancelar();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }

  }

  eliminar(id: any) {
    this.medicoService.eliminarMedico(id).pipe(
      tap( (data) => {
        this.listarMedicos();
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
    this.formulario.markAsUntouched();
    this.formulario.markAsPristine();
    this.formulario.markAsPending();

  }




}
