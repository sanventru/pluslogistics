import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cerrarot',
  templateUrl: './cerrarot.component.html',
  styleUrls: ['./cerrarot.component.css']
})
export class CerrarotComponent implements OnInit {
  datos: LocalDataSource;
  parametros;
  tareasseleccionadas: LocalDataSource;
  arrtareas = [];
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

  settingstareas = {
    columns: {
      tarea: {
        title: 'tarea',
        filter: false
      },
      cantidad: {
        title: 'cantidad',
        filter: false
      },
      tarifa: {
        title: 'tarifa',
        filter: false
      },
    },
    actions: {
      edit: true, delete: true, add: false,
      // custom: [{ name: 'detalle', title: 'Orden Trabajo' }]
    },
  };
  vtarea;
  secuencia;
  codmarca;
  fecha;
  ordennumero;
  tareas;
  ftareas;
  myControl = new FormControl();
  filteredOptions;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srv: ApiService,
    public dialogRef: MatDialogRef<CerrarotComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.tareasseleccionadas = new LocalDataSource;
    this.datos = new LocalDataSource;
    this.parametros = this.params;
    this.datos.load(this.params.novedades);
  }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    this.srv.get_ottareas().subscribe((data) => {
      this.tareas = data;
      this.ftareas = data;
    });
  }

  filtrar(e) {
    if (e.key !== 'Enter') {
      const value = this.vtarea;
      const filterValue = value.toLowerCase();
      this.ftareas = this.tareas.filter(option => option.tarea.toLowerCase().includes(filterValue));
    } else {
      this.add();
    }
  }

  add() {
    let ftareas = [];
    ftareas = this.tareas.filter(option => option.tarea === this.vtarea);
    if (ftareas.length > 0) {
      if (this.arrtareas.length === 0) {
        this.arrtareas.push(ftareas[0]);
        this.tareasseleccionadas.load(this.arrtareas);
      } else {
        this.tareasseleccionadas.append(ftareas[0]);
      }
    }
    this.vtarea = '';
  }

  cerrar() {
    this.dialogRef.close(false);
  }

  guardar() {
    if ( this.tareasseleccionadas['data'].length === 0 ) {
      alert('Debe ingresar al menos una tarea');
      return;
    }
    const datosg = this.parametros;
    datosg['tareas'] = this.tareasseleccionadas['data'];
    datosg['estado'] = 'cerrada';
    this.srv.put_ot(datosg).subscribe((data) => {
      console.log(data);
    });
    this.dialogRef.close(true);
  }
}
