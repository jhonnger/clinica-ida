import {Component, OnInit} from '@angular/core';
import {MedicoService} from "../../services/medico.service";
import {ProgramacionService} from "../../services/programacion.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-programacion-horarios',
  templateUrl: './programacion-horarios.component.html',
  styleUrls: ['./programacion-horarios.component.css']
})
export class ProgramacionHorariosComponent implements OnInit{


  idSeleccionado = null;
  medicos :any[] = [];
  anios: number[] = [];
  cuadricula: any[] = [];
  horarios: number[] = [];
  citaFormulario: any = {};
  displayedColumns: string[] = ['fecha','idmedico','horaInicio', 'horaFin' ,'action'];
  periodos = [
    {
    numero: 1,
    nombre: "enero"
  }, {
    numero: 2,
    nombre: "febrero"
  }, {
    numero: 3,
    nombre: "marzo"
  }, {
    numero: 4,
    nombre: "abril"
  }, {
    numero: 5,
    nombre: "mayo"
  }, {
    numero: 6,
    nombre: "junio"
  }, {
    numero: 7,
    nombre: "julio"
  }, {
    numero: 8,
    nombre: "agosto"
  }, {
    numero: 9,
    nombre: "septiembre"
  }, {
    numero: 10,
    nombre: "octubre"
  }, {
    numero: 11,
    nombre: "noviembre"
  }, {
    numero: 12,
    nombre: "diciembre"
  }];
  constructor(private medicoService: MedicoService,
              private programacionService: ProgramacionService) {
  }
  ngOnInit(): void {
    let hoy = new Date();
    this.obtenerMedicos();
    this.anios.push(hoy.getFullYear())
    this.anios.push(hoy.getFullYear() + 1)
    this.citaFormulario = {
      anio: hoy.getFullYear(),
      mes: hoy.getMonth() +1,
      dia: hoy.getDate()
    }

    this.llenarCuadricula()
    this.pintarDia(this.citaFormulario.dia)
    this.buscar()
  }

  obtenerMedicos(){
    this.medicoService.listarMedico().subscribe((data: any)=> {
      this.medicos = data;
    })
  }

  cancelar(){
    this.buscar()
  }

  pintarDia(dia: number) {

    let idx = -1;

    for (let i = 0; i < this.cuadricula.length; i++){
      this.cuadricula[i].seleccionado = false;
      if (this.cuadricula[i].dia == dia) {
        idx = i;
      }
    }

    this.cuadricula[idx].seleccionado = true;
  }

  modificar(){

    console.log(this.citaFormulario)
  }

  buscar(){
    this.programacionService.buscarProgramacion(this.citaFormulario)
      .pipe(
        tap( (data) => {
          console.log(data);
          this.horarios = data.extraInfo;
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
  }
  cargarDatos(item: any){
    console.log(item)
  }
  mostrarConfirmarEliminar(item: any){
    console.log(item)
  }
  crearNuevo(){
    if(this.validarFormulario()){

      this.programacionService.guardarProgramacion(this.citaFormulario)
        .pipe(
        tap( (data) => {

          this.cancelar();
          this.buscar()
        }),
        catchError( err => {
          return throwError(err);
        })
      ).subscribe();
    }
  }
  validarFormulario(){
    if(this.citaFormulario.medicoId == null){
      return false;
    }
    if(!this.isValidTime24HrFormat(this.citaFormulario.horaInicio)){
      return false;
    }
    if(!this.isValidTime24HrFormat(this.citaFormulario.horaFin)){
      return false;
    }
    return true;
  }

  isValidTime24HrFormat(time: string) {
    const regex = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
    return regex.test(time);
  }
  seleccionarDia(item: any){


    this.citaFormulario.dia = item.dia;
    this.pintarDia(item.dia);
    this.buscar()
  }
  llenarCuadricula(){
    var anio = this.citaFormulario.anio;
    var mes = this.citaFormulario.mes;
    var valores = this.diasParaCalendario(anio, mes);
    var cantidadCuadricula = 37;
    var iniciado = false;
    var index = 0;
    var idx;
    this.cuadricula = [];

    for (var i = 1; i <= cantidadCuadricula; i++) {
      if (i <= 7 && !iniciado) {
        if (valores[0].diaSemana == i) {
          index = i;
          iniciado = true;
          this.cuadricula.push({
            indice: i,
            dia: valores[i - index].dia,
            seleccionado: false,
            id: valores[i - index].id
          });
        } else {
          this.cuadricula.push({indice: i});
        }
      } else {
        if (null !=(valores[i - index])) {
          this.cuadricula.push({
            indice: i,
            dia: valores[i - index].dia,
            seleccionado: false,
            id: valores[i - index].id
          });
        }
      }
    }

  }

  diasEnUnMes(mes: number, anio: number) {
    return new Date(anio, mes, 0).getDate();
  }

  diasParaCalendario( anio: number, mes: number) {
    var numDias = this.diasEnUnMes( mes, anio );
    var arrDias = [];
    for (var i = 1; i <= numDias ; i++) {
      var fecha = new Date( anio, mes -1 , i );
      var dia = {
        indice: fecha.getDate(),
        dia: fecha.getDate(),
        fecha: fecha,
        diaSemana: fecha.getDay() + 1,
        seleccionado: true,
        id: i
      };
      arrDias.push( dia );
    }
    return arrDias;
  }

}
