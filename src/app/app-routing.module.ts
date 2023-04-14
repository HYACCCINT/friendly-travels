import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyTravelsComponent } from './pages/my-travels/my-travels.component';
import { EditTravelsComponent } from './pages/edit-travels/edit-travels.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToTravels = () => redirectLoggedInTo(['my-travels']);

const routes: Routes = [
  {path: '', component: LoginPageComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToTravels}},
  {path: 'signin', component: LoginPageComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToTravels}},
  {path: 'my-travels', component: MyTravelsComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'edit/:travelId', component: EditTravelsComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
