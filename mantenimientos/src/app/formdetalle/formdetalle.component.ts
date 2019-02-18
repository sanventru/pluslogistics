import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-formdetalle',
  templateUrl: './formdetalle.component.html',
  styleUrls: ['./formdetalle.component.css']
})
export class FormdetalleComponent implements OnInit {
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
  cumple1 = 'true';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<FormdetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    console.log(this.data);
  }

}
