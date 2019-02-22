import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  datos: LocalDataSource;
  parametros;
  // datos;
  columnas;
  vertabla = false;
  settings = {
    columns: {
      parte: {
        title: 'parte',
        filter: false
      },
      ubicacion: {
        title: 'ubicacion',
      filter: false
      },
      medida: {
        title: 'medida',
      filter: false
      },
      observacion: {
        title: 'observacion',
      filter: false
      },
      zona: {
        title: 'zona',
      filter: false
      },
      novedades: {
        title: 'novedades',
        filter: false
      }
    },
    actions: {
      edit: false, delete: false, add: false,
      // custom: [{ name: 'detalle', title: 'Orden Trabajo' }]
    },
  };
  secuencia;
  codmarca;
  fecha;
  ordennumero;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srv: ApiService,
    public dialogRef: MatDialogRef<OrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.parametros = params;
    // });
    this.parametros = this.params;
    this.srv.getnovedadeschasis(this.parametros.chasis).subscribe((data) => {
      this.datos = data.datos;
      this.columnas = data.columnas;
      this.vertabla = true;
    });
    this.srv.getsecuencia(this.parametros.marca).subscribe((data) => {
      this.secuencia = data.secuencia;
      this.codmarca = data.cod;
      this.fecha = data.fecha;
    });
  }

  onPrint() {
    // window.print();
    const virtualWindow: any = window.open('', 'PRINT', 'height=400,width=800');
    virtualWindow.document.write('<html><head><title>Print</title>');
    virtualWindow.document.write('</head><body>' + document.getElementById('dialog-print').innerHTML + '</body></html>');
    virtualWindow.document.close();
    virtualWindow.focus();
    setTimeout(t => { virtualWindow.print(); virtualWindow.close(); }, 1000);
    const resp = {};
    resp['novedades'] = this.datos;
    resp['codot'] = this.parametros.chasis + '-OT-' + this.codmarca + this.secuencia;
    this.dialogRef.close(resp);
}

cerrar() {
  this.dialogRef.close(false);
}

}
