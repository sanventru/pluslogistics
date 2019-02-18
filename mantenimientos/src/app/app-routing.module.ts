import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte/reporte.component';
import { FormdetalleComponent } from './formdetalle/formdetalle.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  { path: 'reporte', component: ReporteComponent },
  { path: 'detalle', component: FormdetalleComponent },
  { path: 'formulario/:datos', component: FormularioComponent },
  { path: '**', component: FormularioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
