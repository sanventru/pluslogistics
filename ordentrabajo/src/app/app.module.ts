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
  MatAutocompleteModule
} from '@angular/material';
// import { Ng2CompleterModule } from "ng2-completer";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { of as observableOf, Observable } from 'rxjs';
import { OrdenComponent } from './orden/orden.component';
import { QRCodeModule } from 'angularx-qrcode';
import { OtabiertasComponent } from './otabiertas/otabiertas.component';
import { CerrarotComponent } from './cerrarot/cerrarot.component';


@NgModule({
  declarations: [
    AppComponent,
    NovedadesComponent,
    OrdenComponent,
    OtabiertasComponent,
    CerrarotComponent
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
