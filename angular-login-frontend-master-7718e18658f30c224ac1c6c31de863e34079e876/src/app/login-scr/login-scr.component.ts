import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {Http} from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions,  UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LinkedInService } from 'angular-linkedin-sdk';




var access_token="";
var tok = localStorage.getItem('token');
console.log("from store "+tok);
var login_status="";
var linkedin_state=false;

declare const gapi: any;


@Component({
  selector: 'app-login-scr',
  templateUrl: './login-scr.component.html',
  styleUrls: ['./login-scr.component.css']
})
export class LoginScrComponent implements OnInit {

  input_error="";
  fb_button=false;
  
  constructor(private http:Http, private fb: FacebookService, private router:Router, private linkedInService: LinkedInService){
    console.log('Initializing Facebook');
    
    fb.init({
          appId: '1928905587376942',
          version: 'v2.9'
        });
    
        
       
  }

  //*******************************************Database Login ********************************************//


  signin(){
    this.router.navigate(['/signin']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  login(username,password): void{
    console.log(username);
    console.log(password);
    
    
    if(username==""){
      this.input_error="Please enter a valid username!";
    }
    else if(password==""){
      this.input_error="Please enter password!";
    }
    else{
      this.input_error="";
    }

    this.router.navigate(['/userinfo']);
    
  }

  
  
  //*******************************************Facebook Login ********************************************//
  getfbLoginStatus() {
    this.fb.getLoginStatus()
      .then((res: LoginResponse)=>{
        console.log(res.status);
        login_status=res.status;
        if(login_status=="connected"){
          this.fb_button=true;
          this.fb.logout();
          alert("You have already logged In!")
        }else{
            this.loginfb();
        }
      })
      .catch(console.error.bind(console));  
  }

  
 logoutfb(){

  this.fb.logout()
  .then((res: Response) => {
    console.log('Logged out', res);

   
    
  })
  .catch(this.handleError);
 }
  
  loginfb() {
     
      this.fb.login()
        .then((res: LoginResponse) => {
          console.log('Logged in', res);
           access_token =   this.fb.getAuthResponse()['accessToken'];
          console.log("Access token is  "+access_token);

          localStorage.setItem('token',access_token);
         
          
        })
        .catch(this.handleError);
  }

        
    private handleError(error) {
      console.error('Error processing action', error);
    }


  //*******************************************LinkedIn Login ********************************************//
  public subscribeToisInitialized(){
    this.linkedInService.isInitialized$.subscribe({
    next: (state) => {
      console.log(state);
      linkedin_state=state;
    },
    complete: () => {
      this.linkedinLogin();
    }
  });
}

public linkedinLogin(){
  this.linkedInService.login().subscribe({
    next: (state) => {
      console.log(state);
      this.linkedinrawApiCall();
    },
    complete: () => {
      // Completed
    }
  });
}

public linkedinrawApiCall(){
  const url = '/people/~:(id,first-name,email-address,picture-url)?format=json';
  this.linkedInService.raw(url)
    .asObservable()
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('RAW API call completed');
        }
      });


}

public subscribeToLogout(){
  this.linkedInService.logout().subscribe({
    next: () => {
      // does not emit a value 
    },
    complete: () => {
      // Completed
    }
  });
}

/***********************************************************REST testing CORS******************************************/

// public linkedin_rest(){

//   var url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7842ficiaikl37&redirect_uri=http://localhost:4200&scope=r_basicprofile";
  
//   let headers: Headers = new Headers();
//   headers.append('Content-Type', 'application/x-www-form-urlencoded');
//   headers.append('Access-Control-Allow-Origin', '*');
//   headers.append('Access-Control-Allow-Credentials', 'true');
//   headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');



//   this.http.get(url).map(res => res.json()).subscribe(data => {
//     console.log(data);
   
// },
// err => {
  
//   console.log("errro");
// });

// }

/***********************************************************Google Login******************************************/

public auth2: any;

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '856732093858-tdleuaes6ikdtiu6c21fopqqspde1qig.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public signOut(){
     this.auth2 = this.auth2.disconnect().then(function () {
      console.log('User signed out.');
    });
  }
  
  ngAfterViewInit(){
    this.googleInit();
}

  ngOnInit() {
        
  }

}
