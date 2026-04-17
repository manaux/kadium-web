import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { EntitiesComponent } from './entities/entities/entities.component';
import { ErrorComponent } from './error/error.component';
import { ViewEditEntityComponent } from './entities/view-edit-entity/view-edit-entity.component';
import { AuthGuardService } from './shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: ':entity',
    component: EntitiesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':entity/new',
    component: ViewEditEntityComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':entity/:id',
    component: ViewEditEntityComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
