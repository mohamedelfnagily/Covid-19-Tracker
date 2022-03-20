import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare var particlesJS:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }
  loginError:string = '';

  ngOnInit(): void {
    particlesJS.load('particles-js', "../../../assets/packages/particlesjs-config.json");
  }

  //login form group with all valedations
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{4,8}$/)])
  });

  //submiting data via the httprequest
  sendData(loginform:FormGroup){
    this._AuthService.login(loginform.value).subscribe(
      (response)=>{
        if(response.message == "success")
        {
          localStorage.setItem('userToken' , response.token);
          this._AuthService.setUserData();
          this._Router.navigate(['/home']);
        }
        else
        {
          this.loginError = response.message;
        }
      },
      (error)=>{
        this.loginError = error.message;
      }
    );
  }

}
