import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
interface Loginresponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: string;
  refreshToken: string;
  expiresIn: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private router: Router, private authService: AuthService) {

  }
  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  onLoginWithEmailAndPassword() {
    this.authService.signInWithEmailAndPassword(this.loginForm.value).then((res: any) => {
      if (res.idToken) {
        localStorage.setItem('access_token', res.idToken);
        this.authService.isLoggedIn = true;
        this.router.navigate(['dashboard/home']);
      }
    })
      .catch((err) => {

      })
    this.router.navigate(['dashboard/home']);
  }

  onLoginWithGoogle() {
    this.authService.signInWithGoogle().then((res) => {
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
}
