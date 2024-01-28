import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LpStakePage } from './lp-stake.page';

const routes: Routes = [
  {
    path: '',
    component: LpStakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LpStakePageRoutingModule {}
