import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainPage} from './main.page';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        children: [
            {
                path: 'my-balances',
                loadChildren: () => import('./my-balances/my-balances.module').then(m => m.MyBalancesPageModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
                path: 'stake',
                loadChildren: () => import('./stake/stake.module').then(m => m.StakePageModule)
            },
            {
                path: 'lp-stake',
                loadChildren: () => import('./lp-stake/lp-stake.module').then(m => m.LpStakePageModule)
            },
            {
                path: 'etf-bond',
                loadChildren: () => import('./etf-bond/etf-bond.module').then(m => m.EtfBondPageModule)
            },
            {
                path: 'presale',
                loadChildren: () => import('./presale/presale.module').then(m => m.PresalePageModule)
            },
            {
                path: 'lp-bond',
                loadChildren: () => import('./lp-bond/lp-bond.module').then(m => m.LpBondPageModule)
            },
            {
                path: '**',
                redirectTo: 'my-balances',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '',
        redirectTo: 'my-balances',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {
}
