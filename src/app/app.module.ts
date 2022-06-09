import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { interceptorProvider } from './interceptors/ben-interceptor.service';
import { MainComponentComponent } from './main/main-component.component';
import { BeneficiariosComponent } from './adra/listBeneficiarios/beneficiarios.component';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { BeneficiarioComponent } from './adra/detallebeneficiario/beneficiario.component';
import { SendMailComponent } from './changepassword/send-mail/send-mail.component';
import { ChangePasswordComponent } from './changepassword/change-password.component';
import { AddBeneficiariosComponent } from './adra/add-beneficiarios/add-beneficiarios.component';
import { AddAlimentosComponent } from './adra/add-alimentos/add-alimentos.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignaturePadModule } from 'angular2-signaturepad';
import {MatTabsModule} from '@angular/material/tabs';
import { AddFamiliarComponent } from './adra/add-familiar/add-familiar.component';
import { StockAlimentosComponent } from './adra/stock-alimentos/stock-alimentos.component';
import { StockFormComponent } from './adra/stock-form/stock-form.component';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    MainComponentComponent,
    BeneficiariosComponent,
    DateAgoPipe,
    BeneficiarioComponent,
    SendMailComponent,
    ChangePasswordComponent,
    AddBeneficiariosComponent,
    AddAlimentosComponent,
    AddFamiliarComponent,
    StockAlimentosComponent,
    StockFormComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SignaturePadModule,
    MatTabsModule
  ],
  providers: [
    interceptorProvider,
    { provide: LOCALE_ID, useValue: "es-ES" }, //your locale
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
