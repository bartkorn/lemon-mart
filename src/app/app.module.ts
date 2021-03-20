import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AuthService } from './auth/auth.service'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleDialogComponent } from './common/simple-dialog.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { environment } from '../environments/environment.prod'
import { AngularFireModule } from '@angular/fire'
import { authFactory } from './auth/auth.factory'
import { AngularFireAuth } from '@angular/fire/auth'

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, LoginComponent, SimpleDialogComponent, NavigationMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{
    provide: AuthService,
    useFactory: authFactory,
    deps: [AngularFireAuth]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
