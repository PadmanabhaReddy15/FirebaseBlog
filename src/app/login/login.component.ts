import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { compileNgModule } from '@angular/compiler';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  message: string ="";
  userError: any;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router, private toastr:ToastrService, private spinner:NgxSpinnerService) { 
    this.myForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })


  }
  ngOnInit() {
  }

    onSubmit(form){
      this.spinner.show();
      this.authService.login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);
        this.spinner.hide();
        this.toastr.success('Login Success');
        this.router.navigate(['/blogs'])
      }).catch((error) => {
        this.spinner.hide();
        this.toastr.info('Credentials incorrect');
        this.toastr.error('Login Error');
      })
    }
}
