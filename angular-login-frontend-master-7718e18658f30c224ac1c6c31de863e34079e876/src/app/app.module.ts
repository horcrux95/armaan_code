import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';

import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginScrComponent } from './login-scr/login-scr.component'


import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';

import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import { UserInfoComponent } from './user-info/user-info.component';




const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'loginscr', component: LoginScrComponent},
  { path: 'userinfo', component: UserInfoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    LoginScrComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LinkedInSdkModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    ),
    AlertModule
  ],
  providers: [
    //linkedin
    { provide: 'apiKey', useValue: '7842ficiaikl37' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
