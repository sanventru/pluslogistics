import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ot';
  usuario;
  password;
  logeado = false;
  isActive = true;

  constructor(
    private router: Router,
    private srv: ApiService
  ) {
    const l = window.localStorage.getItem('usuario');
    if (l) {
      this.logeado = true;
    } else {
      this.logeado = false;
    }
  }

  salir() {
    window.localStorage.removeItem('usuario');
    this.logeado = false;
  }

  ingresar() {
    const datos = {};
    datos['usuario'] =  this.usuario;
    datos['clave'] = this.password;
    this.srv.login(datos).subscribe((data) => {
      if (data.empresa) {
        window.localStorage.setItem('usuario', JSON.stringify(data));
        this.logeado = true;
      }
    });

  }

  irOtAbiertas() {
    this.router.navigate(['otabierta']);
  }

  irOtCerradas() {
    this.router.navigate(['otcerrada']);
  }

  irNovedades() {
    this.router.navigate(['novedades']);
  }

}
