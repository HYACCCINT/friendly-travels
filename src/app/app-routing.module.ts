import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MapComponent } from './components/map/map.component';
import { MyTravelsComponent } from './pages/my-travels/my-travels.component';
import { EditTravelsComponent } from './pages/edit-travels/edit-travels.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToTravels = () => redirectLoggedInTo(['my-travels']);

const routes: Routes = [
  { 
    path: 'edit/:travelId', 
    component: EditTravelsComponent,     
    canActivate: [AuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { 
    path: 'my-travels', 
    component: MyTravelsComponent,     
    canActivate: [AuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'signin', component: LoginPageComponent,        canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedInToTravels }},
  { path: '', component: LoginPageComponent,        canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedInToTravels }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
