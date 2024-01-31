import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { ControlledInputComponent } from '../../../shared/components/controlled-input/controlled-input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ControlledInputComponent, ButtonComponent],
})
export class EditClientComponent implements OnInit {
  id: number = null;

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required, ValidationService.nameValidator]],
    documentNumber: ['', [Validators.required, ValidationService.cpfValidator]],
    birthDate: ['', [Validators.required, ValidationService.ageValidator]],
    registrationDate: [''],
    montlyIncome: [0, Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getClient(this.route.snapshot.params['id']);
    this.form.controls['registrationDate'].disable();
    this.form.controls['documentNumber'].disable();
  }

  getClient(id: number) {
    this.id = id;

    this.ds.getClientById(id).subscribe({
      next: response => {
        const client = response[0];
        this.form.setValue({
          id: client.id,
          name: client.name,
          documentNumber: client.documentNumber,
          birthDate: client.birthDate,
          registrationDate: client.registrationDate,
          montlyIncome: client.montlyIncome,
          email: client.email,
        });
      },
      error: error => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.error('Ivalid form!');
      return;
    }

    this.ds.updateClient(this.form.getRawValue()).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/clients/list');
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
