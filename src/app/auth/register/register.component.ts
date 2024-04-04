import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private router: Router, private authService: AuthService) {

  }
  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  onRegisterWithEmailAndPassword() {
    this.authService.registerWithEmailAndPassword(this.registerForm.value).then((res) => {
      this.router.navigate(['auth/login']);
    })
      .catch((err) => {

      })
  }

  onLoginWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => {
      this.router.navigate(['dashboard/home']);
    })
      .catch((err: any) => {
        console.log('error while google login', err);
      })
  }

  onLoginWithFacebook() {
    this.authService.signInWithFacebook().then((res) => {
      this.router.navigate(['dashboard/home']);
    })
      .catch((err: any) => {
        console.log('error while facebook login', err);
      })
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }
  onLogin() {
    this.router.navigate(['dashboard/home']);
  }
}
