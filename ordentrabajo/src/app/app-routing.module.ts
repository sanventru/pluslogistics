import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovedadesComponent } from './novedades/novedades.component';
import { OrdenComponent } from './orden/orden.component';
import { OtabiertasComponent } from './otabiertas/otabiertas.component';
import { CerrarotComponent } from './cerrarot/cerrarot.component';
import { OtcerradasComponent } from './otcerradas/otcerradas.component';
import { ProformaComponent } from './proforma/proforma.component';

const routes: Routes = [
  { path: 'novedades', component: NovedadesComponent },
  { path: 'orden', component: OrdenComponent },
  { path: 'otabierta', component: OtabiertasComponent },
  { path: 'cerrarot', component: CerrarotComponent },
  { path: 'otcerrada', component: OtcerradasComponent },
  { path: 'proforma', component: ProformaComponent },

  { path: '**', component: NovedadesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
