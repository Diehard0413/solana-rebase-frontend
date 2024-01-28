import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresalePage } from './presale.page';

const routes: Routes = [
  {
    path: '',
    component: PresalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresalePageRoutingModule {}
