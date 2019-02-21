import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-otabiertas',
  templateUrl: './otabiertas.component.html',
  styleUrls: ['./otabiertas.component.css']
})
export class OtabiertasComponent implements OnInit {
source: LocalDataSource;

  constructor(
    private srv: ApiService
  ) {
    this.source = new LocalDataSource;
    this.srv.get_ot('abierta').subscribe((data) => {
        this.source.load(data);
    });
   }

  ngOnInit() {


  }

}
