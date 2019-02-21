import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovedadesComponent } from './novedades/novedades.component';
import { OrdenComponent } from './orden/orden.component';

const routes: Routes = [
  { path: 'novedades', component: NovedadesComponent },
  { path: 'orden', component: OrdenComponent },
  { path: '**', component: NovedadesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
