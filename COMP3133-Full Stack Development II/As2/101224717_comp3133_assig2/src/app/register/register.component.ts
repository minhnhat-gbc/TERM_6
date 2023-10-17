import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms'
import { Apollo } from 'apollo-angular';
import { User } from '../models/user';
import { gql } from 'apollo-angular'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const postRegister = gql`mutation ($registerInput: RegisterInput) {
  registerUser(registerInput: $registerInput) {
  
    username
    email
    password
  
  }
}`

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  constructor(private apollo: Apollo, private toastr: ToastrService, private router: Router, private builder: FormBuilder) { }

  // registerForm = this.builder.group({
  //   id: 0,
  //   username: this.builder.control('', Validators.compose([Validators.required])),
  //   email: this.builder.control('', Validators.compose([Validators.required])),
  //   password: this.builder.control('', Validators.compose([Validators.required])),
  // })

  registerForm: User = {
    
    username: '',
    email: '',
    password: '',
  }
  create_user() {
    // if (this.registerForm.valid) {
      this.apollo.mutate({
        mutation: postRegister,
        variables: {
          registerInput: 
          { 
            // username: (this.registerForm.username, Validators.compose([Validators.required])),
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password,

          }
        }
      }).subscribe(({ data, loading }) => {
        
        console.log(data);
        console.log(loading);
        this.toastr.success('Register Successfully');
        this.router.navigate(['login'])
      })
    } 
    // else{
    //   this.toastr.warning('Please enter valid data');

    // }

  //}

}
