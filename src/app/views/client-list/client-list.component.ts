import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ControlledInputComponent } from '../../shared/components/controlled-input/controlled-input.component';
import { IClient } from '../../models/client.model';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  imports: [CommonModule, ButtonComponent, ControlledInputComponent],
})
export class ClientListComponent implements OnInit {
  allClients: IClient[] = [];
  filteredClients: IClient[] = [];

  currentPage: number = 1;
  pages: number[] = [];
  perPage: number = 5;

  constructor(
    private ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.ds.getAllClients().subscribe({
      next: response => {
        this.pages = [];
        for (let i = 1; i <= Math.ceil(response.length / this.perPage); i++) {
          this.pages.push(i);
        }

        this.filteredClients = response.slice(0, this.perPage);
        this.allClients = response;

        console.log(this.filteredClients, 'filteredClients');
        console.log(this.allClients, 'allClients');
        console.log(this.pages, 'pages');
      },
      error: error => {
        console.log(error);
      },
    });
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

  paginate(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;
    this.filteredClients = this.allClients.slice(start, end);
  }
}
