import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlledInputComponent } from '../../../shared/components/controlled-input/controlled-input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ValidationService } from '../../../services/validation.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-client',
  standalone: true,
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ControlledInputComponent, ButtonComponent],
})
export class InsertClientComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit() {
    this.form.controls['registrationDate'].setValue(
      new Date().toJSON().slice(0, 10).replace(/-/g, '/').split('/').reverse().join('/').toString()
    );
    this.form.controls['registrationDate'].disable();

    const randomNumber = Math.floor(Math.random() * 1000);
    this.form.controls['id'].setValue(randomNumber);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.error('Ivalid form!');
      return;
    }

    this.ds.postClient(this.form.getRawValue()).subscribe({
      next: client => {
        console.log(client);
        this.router.navigateByUrl('/clients/list');
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
