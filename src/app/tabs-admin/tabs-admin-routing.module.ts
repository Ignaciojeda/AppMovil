import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsAdminPage } from './tabs-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAdminPage,
    children: [
      {
        path: 'home-admin',
        loadChildren: () => import('../home-admin/home-admin.module').then(m => m.HomeAdminPageModule),
      },
      {
        path: 'historial',
        loadChildren: () => import('../historial/historial.module').then(m => m.HistorialPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs-admin/home-admin',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs-admin/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAdminPageRoutingModule {}
