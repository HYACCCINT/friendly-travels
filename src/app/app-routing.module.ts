import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyTravelsComponent } from './pages/my-travels/my-travels.component';
import { EditTravelsComponent } from './pages/edit-travels/edit-travels.component';

const routes: Routes = [
  {path: 'signin', component: LoginPageComponent},
  {path: 'my-travels', component: MyTravelsComponent},
  {path: 'edit/:travelId', component: EditTravelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
