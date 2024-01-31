import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ControlledInputComponent } from '../../shared/components/controlled-input/controlled-input.component';
import { IClient } from '../../models/client.model';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  imports: [CommonModule, ButtonComponent, ControlledInputComponent, ReactiveFormsModule],
})
export class ClientListComponent implements OnInit {
  allClients: IClient[] = [];
  visibleClients: IClient[] = [];

  private _filteredClients: IClient[] = [];
  set filteredClients(value: IClient[]) {
    console.log(value, 'filteredClients value');
    this._filteredClients = value;
    this.buildPagination();
    this.visibleClients = value.slice((this.currentPage - 1) * 4, this.perPage);
  }
  get filteredClients(): IClient[] {
    return this._filteredClients;
  }

  currentPage: number = 1;
  pages: number[] = [];
  perPage: number = 5;

  selectedOderBy: string = '';
  selectedOderByDirection: string = 'asc';

  form = this.fb.group({
    filter: [''],
  });

  constructor(
    private ds: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.ds.getAllClients().subscribe({
      next: response => {
        this.allClients = response;
        this.filteredClients = response;
        this.selectedOderBy = '';
        this.oderBy('id');
      },
      error: error => {
        console.log(error);
      },
    });
  }

  buildPagination() {
    console.log(this.filteredClients, 'filteredClients');
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.filteredClients.length / this.perPage); i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;
    this.visibleClients = this.filteredClients.slice(start, end);
  }

  deleteClient(id: number) {
    this.ds.deleteClient(id).subscribe({
      next: response => {
        console.log(response);
        this.getClients();
      },
      error: error => {
        console.log(error);
      },
    });
  }

  editClient(id: number) {
    this.router.navigateByUrl('/clients/edit/' + id);
  }

  newClient() {
    this.router.navigateByUrl('/clients/new');
  }

  filterCLients() {
    const filter = this.form.controls['filter'].value;
    if (filter === '') {
      this.filteredClients = this.allClients;
      return;
    }

    console.log(filter);
    const filteredByName = this.allClients.filter(client => {
      return client.name.toLowerCase().includes(filter.toLowerCase());
    });
    const filteredByDocument = this.allClients.filter(client => {
      return client.documentNumber.includes(filter);
    });
    const filteredByBirthDate = this.allClients.filter(client => {
      return client.birthDate.includes(filter);
    });
    this.filteredClients = [...filteredByName, ...filteredByDocument, ...filteredByBirthDate];
  }

  oderBy(field: string) {
    if (this.selectedOderBy === field) {
      this.selectedOderByDirection = this.selectedOderByDirection === 'asc' ? 'desc' : 'asc';
      this.filteredClients = this.filteredClients.reverse();
      return;
    }

    this.selectedOderByDirection = 'asc';
    this.selectedOderBy = field;

    this.filteredClients = this.filteredClients.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  }

  orderByClass(field: string) {
    console.log(this.selectedOderByDirection, field, 'orderByClass');

    if (this.selectedOderBy === field) {
      return `${this.selectedOderByDirection} active-order-by`;
    }
    return '';
  }
}
