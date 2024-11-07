import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  },
  {
    path: 'home',
    component: HomePage,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
