import { Component } from '@angular/core';
import { SrvService } from './srv.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plusmantenimientos';

  constructor(
    private srv: SrvService,
    private route: ActivatedRoute,
    private router: Router) {}

    irReportes() {
      this.router.navigate(['reporte']);

    }

    irFormulario() {
      this.router.navigate(['formulario']);
    }

}
