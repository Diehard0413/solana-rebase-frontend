import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBalancesPage } from './my-balances.page';

const routes: Routes = [
  {
    path: '',
    component: MyBalancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBalancesPageRoutingModule {}
