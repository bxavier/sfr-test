import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { InsertClientComponent } from './views/forms/insert-client/insert-client.component';
import { EditClientComponent } from './views/forms/edit-client/edit-client.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'clients',
    children: [
      {
        path: '',
        redirectTo: 'insert',
        pathMatch: 'full',
      },
      {
        path: 'insert',
        component: InsertClientComponent,
      },
      {
        path: 'edit/:id',
        component: EditClientComponent,
      },
      // {
      //   path: 'list',
      //   component: ListClientComponent,
      // },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
