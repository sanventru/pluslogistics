import { Component, OnInit, Inject } from '@angular/core';
import { SrvService } from '../srv.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormdetalleComponent } from '../formdetalle/formdetalle.component';

export interface DialogData {
  animal: string;
  name: string;
}



const ELEMENT_DATA = [
];

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  fechai;
  fechaf;
  chasis;
  columnasvisibles = ['fecha', 'numero_orden', 'numero_bastidor', 'tipo_comercial', 'ldm', 'ldc', 'matricula', 'kilometraje', 'anio_modelo'
    , 'matriculacion', 'asesor_servicio'];
  displayedColumns: string[] = this.columnasvisibles;

  dataSource = ELEMENT_DATA;
  tablavisible = false;

  constructor(
    private srv: SrvService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  buscar() {
    // const fechai = this.fechai.getDate() + '-' + this.fechai.getMonth() + '-' + this.fechai.getFullYear();
    const datos = {};
    datos['fechai'] = this.fechai;
    datos['fechaf'] = this.fechaf;
    datos['chasis'] = this.chasis;

    this.srv.getmantenimientos(datos).subscribe((data) => {
      this.dataSource = data['datos'];
      this.displayedColumns = data['columnas'];
      this.tablavisible = true;
    });
  }

  detalle(e) {
    for (const v in e) {
      if ( e[v] === true && !v.includes('subsanada')) {
          e[v] = 'true';
      } else {
        if ( e[v] === false && !v.includes('subsanada')) {
        e[v] = 'false';
    }
  }
    }
    const dialogRef = this.dialog.open(FormdetalleComponent, {
      width: '900px',
      // height: '1000px',
      data: e
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const animal = result;
    });
  }
}



