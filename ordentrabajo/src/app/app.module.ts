import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatFormFieldModule,
  MatSelectModule, MatOptionModule, MatInputModule, MatGridListModule, MatCardModule, MatDividerModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatDialogModule,
  MatAutocompleteModule, MatProgressSpinnerModule
} from '@angular/material';
// import { Ng2CompleterModule } from "ng2-completer";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { of as observableOf, Observable } from 'rxjs';
import { OrdenComponent } from './orden/orden.component';
import { QRCodeModule } from 'angularx-qrcode';
import { OtabiertasComponent } from './otabiertas/otabiertas.component';
import { CerrarotComponent } from './cerrarot/cerrarot.component';
import { OtcerradasComponent } from './otcerradas/otcerradas.component';
import { ProformaComponent } from './proforma/proforma.component';


@NgModule({
  declarations: [
    AppComponent,
    NovedadesComponent,
    OrdenComponent,
    OtabiertasComponent,
    CerrarotComponent,
    OtcerradasComponent,
    ProformaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Ng2CompleterModule,
    Ng2SmartTableModule,
    QRCodeModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
