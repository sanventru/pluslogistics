import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatFormFieldModule,
MatSelectModule, MatOptionModule, MatInputModule, MatGridListModule, MatCardModule, MatDividerModule,
MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatDialogModule

} from '@angular/material';
import { ReporteComponent } from './reporte/reporte.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormdetalleComponent } from './formdetalle/formdetalle.component';
// import { MaterialModule } from '@angular/material/material';


@NgModule({
  declarations: [
    AppComponent,
    ReporteComponent,
    FormularioComponent,
    FormdetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
