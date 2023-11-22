import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RolService} from "../../services/rol.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formulario: FormGroup;
  roles: any[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private rolService: RolService,
              private authService: AuthService) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarRoles();
  }

  listarRoles(){
    this.rolService.listarRoles().subscribe((data: any)=> {
      this.roles = data;
      console.log(data);
    })
  }

  enviar() {
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      this.authService.login(this.formulario.value).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/medico']);
        }, error => {
          // Swal.
          Swal.fire({
            title: 'Error!',
            text: 'Credenciales incorrectas!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      )
      // Enviar formulario al servidor
    }
  }
}
