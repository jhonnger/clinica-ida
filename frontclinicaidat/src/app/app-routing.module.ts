import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UsuarioComponent} from "./components/usuario/usuario.component";
import {MedicoComponent} from "./components/medico/medico.component";
import {PacienteComponent} from "./components/paciente/paciente.component";
import {CitaComponent} from "./components/cita/cita.component";
import {MenuComponent} from "./components/menu/menu.component";
import {RolComponent} from "./components/rol/rol.component";
import {EspecialidadComponent} from "./components/especialidad/especialidad.component";
import {AseguradoraComponent} from "./components/aseguradora/aseguradora.component";
import {InicioComponent} from "./components/inicio/inicio.component";
import {ProgramacionHorariosComponent} from "./components/programacion-horarios/programacion-horarios.component";

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: InicioComponent,
    children: [
      { path: 'usuario', component: UsuarioComponent},
      { path: 'medico', component: MedicoComponent},
      { path: 'paciente', component: PacienteComponent},
      { path: 'cita', component: CitaComponent},
      { path: 'rol', component: RolComponent},
      { path: 'especialidad', component: EspecialidadComponent},
      { path: 'programacion', component: ProgramacionHorariosComponent},
      { path: 'aseguradora', component: AseguradoraComponent},
      { path: 'menu', component: MenuComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
