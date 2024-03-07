import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {

  }
  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }
  onLogin() {
    this.router.navigate(['dashboard/home'])
  }
}
