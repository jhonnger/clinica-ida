import {Component, OnInit} from "@angular/core";
import {PacienteService} from "../../../services/paciente.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-paciente-modal-buscador',
  templateUrl: './paciente-modal-buscador.component.html',
  styleUrls: ['./paciente-modal-buscador.component.css']
})
export class PacienteModalBuscadorComponent implements OnInit{

  filtro = '';
  pacientes: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido','sexo','celular' , 'dni','action'];

  constructor(private pacienteServicio: PacienteService,
              public dialogRef: MatDialogRef<any>) {
  }
  ngOnInit() {
     this.filtrar();
  }
  seleccionar(item: any){
    this.dialogRef.close(item);
  }
  cerrar(){
    this.dialogRef.close();
  }

  filtrar(){
    this.pacienteServicio.filtrar(this.filtro)
      .subscribe((data: any) => {

        this.pacientes = data;
        console.log(data)
      })
  }
}
