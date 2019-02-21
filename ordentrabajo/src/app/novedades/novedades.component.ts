import { Component, OnInit } from '@angular/core';
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
export class NovedadesComponent implements OnInit {
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
      }
    },
    actions: {
      edit: false, delete: false, add: false,
      custom: [{ name: 'detalle', title: 'OT' }]
    },
  };
  resp;

  constructor(
    private srv: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.source = new LocalDataSource();
    this.srv.getnovedades().subscribe((data) => {
      this.columnas = data.columnas;
      this.source.load(data.datos);
    });
  }

  ngOnInit() {
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
        datos['novedades'] = this.resp;
        this.srv.post_ot(datos).subscribe((data) => {
          console.log(data);
        });
        // aqui actualizar la base para decir que ya esta tomada la orden
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
