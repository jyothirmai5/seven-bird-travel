import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm: Observable<any[]>;

  contactFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  })

  constructor(private router: Router, private db: AngularFireDatabase) {
    this.contactForm = this.db.list('contactForm').valueChanges();
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard/home']);
  }


  addContactForm() {
    // Add data to Firebase
    console.log(this.contactFormGroup.valid, this.contactFormGroup.value);

    if (this.contactFormGroup.valid) {
      this.db.list('contactForm').push(this.contactFormGroup.value);
      this.contactFormGroup.reset();
    }
  }

}
