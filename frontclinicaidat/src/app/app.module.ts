import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import { UsuarioComponent } from './components/usuario/usuario.component';
import {MatTableModule} from "@angular/material/table";
import { MedicoComponent} from "./components/medico/medico.component";
import { PacienteComponent } from './components/paciente/paciente.component';
import { CitaComponent } from './components/cita/cita.component';
import { MenuComponent } from './components/menu/menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from "@angular/material/menu";
import { RolComponent } from './components/rol/rol.component';
import { EspecialidadComponent } from './components/especialidad/especialidad.component';
import { AseguradoraComponent } from './components/aseguradora/aseguradora.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {MatIconModule} from "@angular/material/icon";
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import {MatDialogModule} from "@angular/material/dialog";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MedicoComponent,
    UsuarioComponent,
    PacienteComponent,
    CitaComponent,
    MenuComponent,
    RolComponent,
    EspecialidadComponent,
    AseguradoraComponent,
    InicioComponent,
    ModalConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
