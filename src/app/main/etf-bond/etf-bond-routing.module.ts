import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtfBondPage } from './etf-bond.page';

const routes: Routes = [
  {
    path: '',
    component: EtfBondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtfBondPageRoutingModule {}
