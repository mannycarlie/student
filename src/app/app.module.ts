import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { CommonModule } from '@angular/common';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
// import { CatalogModule } from './catalog/catalog.module';
// import { CatalogComponent } from './catalog/catalog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing,
    CommonModule
    // CatalogModule
  ],
  providers: [LoginService, CookieService,{ provide: CookieOptions, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
