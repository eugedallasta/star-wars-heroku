import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      alert('Atention! wrong e-mail or password. You need to be registered for log in')
      return null;
    }
  }


  async loginWithGoogle(email: string, password: string) {
    try {
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log("error en login con google: ", err);
      alert('Atention! user not founded. You need to be registered for log in')
      return null;
    }
  }

  getUserLogged() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }



}
