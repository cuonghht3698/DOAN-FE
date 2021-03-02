import { RegistrationComponent } from './layouts/registration/registration.component';
import { LoginComponent } from './layouts/login/login.component';

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authService/authentication.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './layouts/home/home.component';
import { CommonModule } from '@angular/common';


// ant design
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from './material.module';
import { SharedModule } from './share.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SubStringPipe } from './services/pipes/substring.pipe';

//Component


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule,
    MaterialModule,
    IvyCarouselModule
  ],
  providers: [AuthenticationService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
