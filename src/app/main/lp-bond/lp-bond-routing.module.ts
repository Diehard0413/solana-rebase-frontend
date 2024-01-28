import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LpBondPage } from './lp-bond.page';

const routes: Routes = [
  {
    path: '',
    component: LpBondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LpBondPageRoutingModule {}
