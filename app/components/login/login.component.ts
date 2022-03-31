import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';

import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor( private api:ApiService, private router:Router) { }

  errorStatus:boolean = false;
  errorMsj:any = "";
  
  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['home']);
    }
  }

  onLogin(form:loginI){
    this.api.loginByEmail(form).subscribe(data =>{
      let dataResponse:ResponseI = data;
      
      if(dataResponse.token != null){
        localStorage.setItem("token",dataResponse.token)
        this.router.navigate(['home'])
      }
      
    },error => {this.errorMsj =error.error;
      this.errorStatus = true;
    
    });
}
  changeStatus()   {
    this.errorStatus=false;
  }

  getToken(){
    if(localStorage.getItem("token")== null){
      this.router.navigate(["login"])
    }
  }
}
