import { Component, OnInit, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  user$ = user(this.auth);
  constructor() {}

  ngOnInit(): void {}

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      return credential;
    })
  }
  logout() {
    signOut(this.auth).then(() => {
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }
}