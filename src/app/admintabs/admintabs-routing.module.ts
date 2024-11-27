import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmintabsPage } from './admintabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdmintabsPage,
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
        path: '',
        redirectTo: '/admintabs/adminh',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/admintabs/adminh',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmintabsPageRoutingModule{}