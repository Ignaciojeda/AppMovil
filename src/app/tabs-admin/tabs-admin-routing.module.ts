import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsAdminPage } from './tabs-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAdminPage,
    children: [
      {
        path: 'historial',
        loadChildren: () => import('../historial/historial.module').then(m => m.HistorialPageModule)
      },
      {
        path: 'adminh',
        loadChildren: () => import('../adminh/adminh.module').then(m => m.AdminhPageModule)
      },
      {
        path: 'admino',
        loadChildren: () => import('../admino/admino.module').then(m=>m.AdminoPageModule)
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
