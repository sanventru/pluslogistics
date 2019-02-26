import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CerrarotComponent } from '../cerrarot/cerrarot.component';
import { OrdenComponent } from '../orden/orden.component';

@Component({
  selector: 'app-otabiertas',
  templateUrl: './otabiertas.component.html',
  styleUrls: ['./otabiertas.component.css']
})
export class OtabiertasComponent implements OnInit, DoCheck {
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
      custom: [{ name: 'detalle', title: ' <i class="fa fa-check-square  fa-2x" > </i>' },
      { name: 'reimprimir', title: ' <i class="fa fa-print fa-2x" > </i>' }]
    },
  };
  resp;
  totalRows;

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

  ngDoCheck() {
    this.totalRows = this.source != null ? this.source.count() : null;
  }

  onCustom(event) {
    if (event.action === 'detalle') {
      const datos = event.data;
      const dialogRef = this.dialog.open(CerrarotComponent, {
        disableClose: true,
        width: '900px',
        data: datos
      });
      dialogRef.afterClosed().subscribe(result => {
        this.resp = result;
        if (result) {
          this.source.remove(datos);
          // this.source.remove(datos);
          //   this.srv.get_ot('abierta').subscribe((data) => {
          //     this.source.load(data);
          // });
        }
      });
    } else if (event.action = 'reimprimir') {
      const datos = event.data;
      const dialogRef = this.dialog.open(OrdenComponent, {
        disableClose: true,
        width: '900px',
        data: datos
      });
      dialogRef.afterClosed().subscribe(result => {
        this.resp = result;
        if (result) {
          this.source.remove(datos);
          // this.source.remove(datos);
          //   this.srv.get_ot('abierta').subscribe((data) => {
          //     this.source.load(data);
          // });
        }
      });
    }
  }
}
