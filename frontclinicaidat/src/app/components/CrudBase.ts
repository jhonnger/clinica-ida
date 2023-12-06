import {ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";

export class CrudBase{

  public formDirective!: FormGroupDirective;
  formulario: FormGroup;
  idSeleccionado: number = -1;


  constructor(public fb:FormBuilder) {
    this.formulario = this.fb.group({});
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
