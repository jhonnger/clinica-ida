import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [
    trigger('expandirAnimacion', [
      state('void', style({
        height: '0',
        opacity: '0'
      })),
      state('*', style({
        height: '*',
        opacity: '1'
      })),
      transition('void <=> *', [
        animate('0.3s ease-in-out')
      ])
    ])]
})
export class InicioComponent {
  title = 'FrontClinica';
  isLogin = false;
  botonInicioExpandido = false;
  botonProcesoExpandido = false;
  botonMantExpandido = false;

  constructor(private router: Router) { }

  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLogin = event.url === '/login';
    });

  }
  toggleBotonInicio(){
    this.botonInicioExpandido = !this.botonInicioExpandido;
    this.botonMantExpandido = false;
    this.botonProcesoExpandido = false
  }
  toggleBotonMant(){
    this.botonMantExpandido = !this.botonMantExpandido;
    this.botonInicioExpandido = false;
    this.botonProcesoExpandido = false
  }
  toggleBotonProceso(){
    this.botonProcesoExpandido = !this.botonProcesoExpandido;
    this.botonMantExpandido = false;
    this.botonInicioExpandido = false
  }
}
