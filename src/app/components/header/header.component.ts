import { Component, inject } from '@angular/core';
import { TravelService } from '../../services/travel.service';
import { Auth, signOut, user } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private auth = inject(Auth);
  user$ = user(this.auth);
  
  logout() {
    signOut(this.auth).then(() => {
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }
}
