import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CerrarotComponent } from '../cerrarot/cerrarot.component';

@Component({
  selector: 'app-otabiertas',
  templateUrl: './otabiertas.component.html',
  styleUrls: ['./otabiertas.component.css']
})
export class OtabiertasComponent implements OnInit {
source: LocalDataSource;
settings = {
  columns: {
    cod: {
      title: 'cod'
    },
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
    estado: {
      title: 'estado'
    },
    // novedades: {
    //   title: 'novedades'
    // }
  },
  actions: {
    edit: false, delete: false, add: false,
    custom: [{ name: 'detalle', title: 'CERRAR OT' }]
  },
};
resp;

  constructor(
    private srv: ApiService,
    public dialog: MatDialog
  ) {
    this.source = new LocalDataSource;
    this.srv.get_ot('abierta').subscribe((data) => {
        this.source.load(data);
    });
   }

  ngOnInit() {


  }

  onCustom(event) {
    const datos = event.data;
    const dialogRef = this.dialog.open(CerrarotComponent, {
      disableClose: true,
      width: '900px',
      data: datos
    });
    dialogRef.afterClosed().subscribe(result => {
      this.resp = result;
      if (result) {
        this.srv.get_ot('abierta').subscribe((data) => {
          this.source.load(data);
      });
        // aqui actualizar la base para decir que ya esta tomada la orden
      }
    });
  }
}
