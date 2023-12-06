import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PacienteService} from "../../services/paciente.service";
import {catchError, tap, throwError} from "rxjs";
import {CrudBase} from "../CrudBase";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent extends CrudBase implements OnInit{

  paciente:any[] = [];
  sexo: any[] = ["F", "M"];
  @ViewChild('formDirective')
  override formDirective!: FormGroupDirective;
  displayedColumns: string[] = ['id', 'nombre', 'apellido','sexo','celular' , 'dni',];

  constructor(
    public override fb:FormBuilder,
    private pacienteService: PacienteService) {
    super(fb)
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(){
    this.pacienteService.listarPaciente().subscribe((data: any) => {
      this.paciente = data;
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
    })
  }

  enviarGuardar(){
    let paciente = this.formulario.value;
    const idPacienteSeleccionado = this.formulario.value.id;
    paciente.id = this.paciente.find(r => r.id === idPacienteSeleccionado);
    if (this.idSeleccionado > 0) {
      this.actualizar(this.idSeleccionado, paciente);
    } else {
      this.guardar(paciente);
    }
  }

  guardar(paciente: any) {
    if (this.formulario.valid){
      this.pacienteService.guardarPaciente({
        ...paciente
      }).pipe(
        tap( (data) => {
          console.log(data);
          this.listarPacientes();
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }

  }

  actualizar(idPaciente: number, paciente: any){
    paciente.id = idPaciente;
    this.pacienteService.actualizarPaciente({
      ...paciente
    }).pipe(
      tap( (data) => {
        console.log(data);
        this.listarPacientes();
      }),
      catchError( err => {
        return throwError(err);
      })
    ).subscribe();
  }

  eliminar() {
    this.pacienteService.eliminarPaciente(this.idSeleccionado).pipe(
      tap((data) => {
        console.log(data);
        this.listarPacientes();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe();
  }



}
