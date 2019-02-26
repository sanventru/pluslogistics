import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrdenComponent } from '../orden/orden.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit, DoCheck {
  columnas;
  source: LocalDataSource;
  settings = {
    columns: {
      chasis: {
        title: 'chasis'
      },
      marca: {
        title: 'marca'
      },
      motor: {
        title: 'motor'
      },
      modelo: {
        title: 'modelo'
      },
      color: {
        title: 'color'
      },
      fecha: {
        title: 'fecha facturación'
      },
      concesionario: {
        title: 'concesionario'
      },
      num_novedades: {
        title: '# Daños'
      }
    },
    actions: {
      edit: false, delete: false, add: false,
      custom: [{ name: 'detalle', title: 'OT' }]
    },
  };
  resp;
  usuario;
  spinner = true;
  totalRows = 0;

  constructor(
    private srv: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.usuario = JSON.parse(window.localStorage.getItem('usuario'));
    this.source = new LocalDataSource();
    this.srv.getnovedades(this.usuario).subscribe((data) => {
      this.columnas = data.columnas;
      this.source.load(data.datos);
      this.spinner = false;
    });
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.totalRows = this.source != null ? this.source.count() : null;
  }

  onCustom(event) {
    const datos = event.data;
    const dialogRef = this.dialog.open(OrdenComponent, {
      width: '900px',
      data: datos
    });
    dialogRef.afterClosed().subscribe(result => {
      this.resp = result;
      if (result) {
        this.source.remove(datos);
        datos['cod'] = this.resp['codot'];
        datos['novedades'] = this.resp['novedades'];
        datos['usuario'] = this.usuario.usuario;
        this.srv.post_ot(datos).subscribe((data) => {
          console.log(data);
        });
        // aqui actualizar la base para decir que ya esta tomada la orden
        this.srv.updatesql_novedades(datos).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }

  detalle(e) {
    const dialogRef = this.dialog.open(OrdenComponent, {
      width: '900px',
      data: e
    });
  }

}
