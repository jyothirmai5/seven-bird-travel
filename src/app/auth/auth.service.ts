import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth'
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    constructor(private afs: AngularFireAuth) {
        this.afs.authState.subscribe(user => {
            this.isLoggedIn = !!user;
        });
    }

    signInWithGoogle() {
        return this.afs.signInWithPopup(new GoogleAuthProvider())
    }

    registerWithEmailAndPassword(user: { email: string, password: string }) {
        return this.afs.createUserWithEmailAndPassword(user.email, user.password);
    }

    signInWithEmailAndPassword(user: { email: string, password: string }) {
        return this.afs.signInWithEmailAndPassword(user.email, user.password);
    }

    async logout() {
        try {
            await this.afs.signOut();
        } catch (error) {
            console.error('Logout Error:', error);
        }
    }
}