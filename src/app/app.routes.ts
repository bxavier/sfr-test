import { Routes } from '@angular/router';
import { ClientListComponent } from './views/client-list/client-list.component';
import { NewClientComponent } from './views/forms/new-client/new-client.component';
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
        path: 'new',
        component: NewClientComponent,
      },
      {
        path: 'edit/:id',
        component: EditClientComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'list' },
];
