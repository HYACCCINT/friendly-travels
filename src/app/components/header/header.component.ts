import { Component, inject } from '@angular/core';
import { TravelService } from '../../services/travel.service';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private auth: Auth = inject(Auth);
  travelService: TravelService = inject(TravelService);
  user$ = this.travelService.user$;

  logout() {
    signOut(this.auth)
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
