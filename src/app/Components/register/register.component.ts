import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare var particlesJS:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerError:string = '';
  constructor(private _AuthService:AuthService , private _Router:Router) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', "../../../assets/packages/particlesjs-config.json");
  }

  //creating new formgroup for registeration with all validations
  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null , [Validators.required , Validators.minLength(4) , Validators.maxLength(10)]),
    last_name:new FormControl(null , [Validators.required , Validators.minLength(4) , Validators.maxLength(10)]),
    age:new FormControl(null , [Validators.required , Validators.min(16) , Validators.max(80)]),
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{4,8}$/)])
  });
  
  //submiting data via the httprequest
  sendData(registerform:FormGroup){
    this._AuthService.register(registerform.value).subscribe(
      (response)=>{
        if(response.message == "success")
        {
          console.log(response);
          this._Router.navigate(['/login']);
        }
        else
        {
          this.registerError = response.message;
        }
      },
      (error)=>{
        this.registerError = error.message;
      }
    );
  }


}
