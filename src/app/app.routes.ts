import { Routes } from '@angular/router';
import { ClientListComponent } from './views/client-list/client-list.component';
import { InsertClientComponent } from './views/forms/insert-client/insert-client.component';
import { EditClientComponent } from './views/forms/edit-client/edit-client.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  {
    path: 'clients',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ClientListComponent,
      },
      {
        path: 'insert',
        component: InsertClientComponent,
      },
      {
        path: 'edit/:id',
        component: EditClientComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'list' },
];
