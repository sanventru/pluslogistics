import { Component, OnInit } from '@angular/core';
import { SrvService } from '../srv.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  title = 'plusmantenimientos';
  numeroorden = '';
  numerobastidor = '';
  tipocomercial = '';
  codigotipocomercial = '';
  ldm = '';
  ldc = '';
  matricula = '';
  kilometraje = '';
  aniomodelo = '';
  matriculacion = '';
  asesorservicio = '';
  lugar = '';
  b1r1 = false;
  b1r2 = false;
  b1r3 = false;
  b1r4 = false;
  b2r1 = false;
  b2r2 = false;
  b3r1 = false;
  b3r2 = false;
  b4r1 = false;
  b4r2 = false;
  b5r1 = false;
  b5r2 = false;
  c1 = false;
  c2 = false;
  c3 = false;
  c4 = false;
  c5 = false;
  c6 = false;
  c7 = false;
  c8 = false;
  c9 = false;
  c10 = false;
  c11 = false;
  c12 = false;
  err = {};
  constructor(
    private srv: SrvService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
  }

  infochasis(e) {
    if (e.key === 'Enter') {
      this.srv.getdatachasis(this.numerobastidor).subscribe(data => {
        this.codigotipocomercial = data['mo_secuencial'];
        this.tipocomercial = data["ve_modelo"];
      });
    }
  }

  irReportes() {
    this.router.navigate(['reporte']);
  }

  enviar() {
    const datos = {};
    datos["numeroorden"] = this.numeroorden;
    datos["numerobastidor"] = this.numerobastidor;
    datos["tipocomercial"] = this.tipocomercial;
    datos["codigotipocomercial"] = this.codigotipocomercial;
    datos["ldm"] = this.ldm;
    datos["ldc"] = this.ldc;
    datos["matricula"] = this.matricula;
    datos["kilometraje"] = this.kilometraje;
    datos["aniomodelo"] = this.aniomodelo;
    datos["matriculacion"] = this.matriculacion;
    datos["asesorservicio"] = this.asesorservicio;
    datos["lugar"] = this.lugar;
    datos["ind1"] = "1";
    datos["b1r1"] = this.b1r1;
    datos["c1"] = this.c1;
    datos["ind2"] = "2";
    datos["b1r2"] = this.b1r2;
    datos["c2"] = this.c2;
    datos["ind3 "] = "3";
    datos["b1r3"] = this.b1r3;
    datos["c3"] = this.c3;
    datos["ind4"] = "4";
    datos["b1r4"] = this.b1r4;
    datos["c4"] = this.c4;
    datos["ind5"] = "5";
    datos["b2r1"] = this.b2r1;
    datos["c5"] = this.c5;
    datos["ind6"] = "6";
    datos["b2r2"] = this.b2r2;
    datos["c6"] = this.c6;
    datos["ind7"] = "7";
    datos["b3r1"] = this.b3r1;
    datos["c7"] = this.c7;
    datos["ind8"] = "8";
    datos["b3r2"] = this.b3r2;
    datos["c8"] = this.c8;
    datos["ind9"] = "9";
    datos["b4r1"] = this.b4r1;
    datos["c9"] = this.c9;
    datos["ind10"] = "10";
    datos["b4r2"] = this.b4r2;
    datos["c10"] = this.c10;
    datos["ind11"] = "11";
    datos["b5r1"] = this.b5r1;
    datos["c11"] = this.c11;
    datos["ind12"] = "12";
    datos["b5r2"] = this.b5r2;
    datos["c12"] = this.c12;
    const valido = this.validar();
    if (valido) {
      this.srv.postmantenimientos(datos).subscribe(data => {
        console.log(data);
        alert('Datos almacenados');
        this.limpiar();
      });
    } else {
      alert('Por favor ingresar todos los campos');
    }
  }

  limpiar() {
    this.numeroorden = '';
    this.numerobastidor = '';
    this.tipocomercial = '';
    this.codigotipocomercial = '';
    this.ldm = '';
    this.ldc = '';
    this.matricula = '';
    this.kilometraje = '';
    this.aniomodelo = '';
    this.matriculacion = '';
    this.asesorservicio = '';
    this.lugar = '';
    this.b1r1 = false;
    this.b1r2 = false;
    this.b1r3 = false;
    this.b1r4 = false;
    this.b2r1 = false;
    this.b2r2 = false;
    this.b3r1 = false;
    this.b3r2 = false;
    this.b4r1 = false;
    this.b4r2 = false;
    this.b5r1 = false;
    this.b5r2 = false;
    this.c1 = false;
    this.c2 = false;
    this.c3 = false;
    this.c4 = false;
    this.c5 = false;
    this.c6 = false;
    this.c7 = false;
    this.c8 = false;
    this.c9 = false;
    this.c10 = false;
    this.c11 = false;
    this.c12 = false;
  }
  
  validar() {
    let valido = false;
    valido = this.numeroorden !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.numerobastidor !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.tipocomercial !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.codigotipocomercial !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.ldm !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.ldc !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.matricula !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.kilometraje !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.aniomodelo !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.matriculacion !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.asesorservicio !== '' ? true : false;
    if (!valido) { return valido; }
    valido = this.lugar !== '' ? true : false;
    if (!valido) { return valido; }
    return valido;
  }
}
