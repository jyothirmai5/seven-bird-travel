import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  constructor(private router: Router) {

  }

  navigateToDashboard() {
    this.router.navigate(['dashboard/home']);
  }
}
