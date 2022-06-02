import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftsAlertComponent } from './components/aircrafts-alert/aircrafts-alert.component';
import { AircraftsComponent } from './components/aircrafts/aircrafts.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'aircrafts', component: AircraftsComponent, canActivate: [AuthGuardService] },
  { path: 'aircrafts-alert', component: AircraftsAlertComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginPageComponent },
  { path : '' , redirectTo : 'login', pathMatch : 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
