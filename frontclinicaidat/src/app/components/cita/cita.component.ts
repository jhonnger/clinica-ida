import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MedicoService} from "../../services/medico.service";
import {PacienteService} from "../../services/paciente.service";
import {UsuarioService} from "../../services/usuario.service";
import {AseguradoraService} from "../../services/aseguradora.service";
import {CitaService} from "../../services/cita.service";
import {catchError, tap, throwError} from "rxjs";
import {ModalConfirmComponent} from "../modal-confirm/modal-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {PacienteModalBuscadorComponent} from "../paciente/paciente-modal-buscador/paciente-modal-buscador.component";
import {ProgramacionService} from "../../services/programacion.service";

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit{

  formulario:FormGroup;
  idSeleccionado: number = -1;
  fecha: any = new Date();
  medicos: any[] = [];
  cita: any = {
    paciente: {}
  };
  turnos: any[] = [];
  citas: any[] = [];
  pacientes: any[] = [];
  aseguradoras: any[] = [];
  usuarios: any[] = [];

  displayedColumns: string[] = ['id', 'idpaciente', 'idmedico','fecha','hora' , 'idaseguradora','numeropoliza'];

  constructor(
    private fb:FormBuilder,
    private medicoService: MedicoService,
    public dialog: MatDialog,
    private pacienteService: PacienteService,
    private aseguradoraService: AseguradoraService,
    private programacionService: ProgramacionService,
    private usuarioService: UsuarioService,
    private citaService: CitaService) {
    this.listarAseguradoras()
    this.listarMedicos()
    this.listarUsuarios()
    this.listarPacientes()

    this.formulario = this.fb.group({
      paciente: ['', Validators.required],
      medico: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      aseguradora: ['', Validators.required],
      numeropoliza: ['', Validators.required],
      usuario: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.listarCitas();
  }

  cambioFecha(){

    console.log(this.fecha)
    console.log(this.formulario.value.fecha)
    this.programacionService.listarTurnos({
      fecha: this.formulario.value.fecha,
      medicoId: this.formulario.value.medico
    })
      .subscribe(data => {
        console.log(data)
        this.turnos = data.extraInfo;
      })
  }
  abrirModalPacientes(){
    this.dialog.open(PacienteModalBuscadorComponent,{data: {

      }})
      .afterClosed()
      .subscribe(data => {
        this.formulario.setValue({
          ...this.formulario.value,
          paciente:  data.nombre + ' ' +data.apellido
        })
        this.cita.paciente = {
          id: data.id,
          nombre: data.nombre + ' ' +data.apellido
        }
        console.log(data)
      })
  }
  listarCitas(){
    this.citaService.listarCita().subscribe((data: any) => {
      this.citas = data;
      console.log(data)
    })
  }

  listarPacientes(){
    this.pacienteService.listarPaciente().subscribe((data: any)=> {
      this.pacientes = data;
      console.log(data);
    })
  }

  listarMedicos(){
    this.medicoService.listarMedico().subscribe((data: any)=> {
      this.medicos = data;
      console.log(data);
    })
  }

  listarAseguradoras(){
    this.aseguradoraService.listarAseguradoras().subscribe((data: any)=> {
      this.aseguradoras = data;
      console.log(data);
    })
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe((data: any)=> {
      this.usuarios = data;
      console.log(data);
    })
  }

  cargarDatos(element: any){
    this.idSeleccionado = element.id;
    console.log(this.idSeleccionado);
    console.log(element);
    this.formulario.setValue({
      paciente: element.paciente.id,
      medico: element.medico.id,
      fecha: element.fecha,
      hora: element.hora,
      aseguradora: element.aseguradora.id,
      numeropoliza: element.numeropoliza,
      usuario: element.usuario.id,
    })
  }

  enviarGuardar(){
    let cita = this.formulario.value;
    const idPacienteSeleccionado = this.formulario.value.paciente;
    const idMedicoSeleccionado = this.formulario.value.medico;
    const idAseguradoraSeleccionado = this.formulario.value.aseguradora;
    const idUsuarioSeleccionado = this.formulario.value.usuario;
    cita.paciente = this.pacientes.find(r => r.id === idPacienteSeleccionado);
    cita.medico = this.medicos.find(r => r.id === idMedicoSeleccionado);
    cita.aseguradora = this.aseguradoras.find(r => r.id === idAseguradoraSeleccionado);
    cita.usuario = this.usuarios.find(r => r.id === idUsuarioSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, cita);
    } else {
      this.guardar(cita);
    }
  }

  guardar(cita: any) {
    this.listarCitas();
    this.citaService.guardarCita({
      ...cita
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarCitas();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  actualizar(idCita: number, cita: any){
    cita.id = idCita;
    this.citaService.actualizarCita({...cita
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarCitas();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  eliminar() {
    this.citaService.eliminarCita(this.idSeleccionado).pipe(
      tap( (data) => {
        console.log(data);
        this.listarCitas();
      }),
      catchError( err => {
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
