import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../auth-guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'checkin',
        loadComponent: () =>
          import('../checkin/checkin.page').then((m) => m.CheckinPage),
      },
      {
        path: 'relatorio',
        loadComponent: () =>
          import('../relatorio/relatorio.page').then((m) => m.RelatorioPage ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('../admin/admin.page').then((m) => m.AdminPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },

    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];




