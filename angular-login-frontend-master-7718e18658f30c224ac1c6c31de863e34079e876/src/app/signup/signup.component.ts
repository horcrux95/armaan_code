import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Http} from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions,  UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LinkedInService } from 'angular-linkedin-sdk';


var access_token="";
var login_status="";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  input_error="";
  fb_button=false;

  constructor(private http:Http, private fb: FacebookService, private router:Router, private linkedInService: LinkedInService){
    console.log('Initializing Facebook');
    
    fb.init({
          appId: '1928905587376942',
          version: 'v2.9'
        });
    
        
       
  }

  ngOnInit() {
    var tok = localStorage.getItem('token');
    console.log("from store "+tok);
  }


    //*******************************************Database Login ********************************************//

  signin(){
    this.router.navigate(['/loginscr']);
  }

 

  signup(name,username,password,password1): void{
    
    console.log(name);
    console.log(password);
    
    console.log(username);
    console.log(password1);
    
    
    if(username=="" || password=="" || password1=="" || name==""){
      this.input_error="Please enter all fields correctly!";
    }else if(password != password1){
      this.input_error="Enter same password!";
    }
    else {
      this.input_error="";
    }

    
    
    
  }


    //*******************************************Facebook Login ********************************************//
    getfbLoginStatus() {
      this.fb.getLoginStatus()
        .then((res: LoginResponse)=>{
          console.log(res.status);
          login_status=res.status;
          if(login_status=="connected"){
            this.fb_button=true;
            
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

    //*******************************************Linkedin Login ********************************************//


     
}



