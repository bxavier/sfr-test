import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlledInputComponent } from '../../../shared/components/controlled-input/controlled-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insert-client',
  standalone: true,
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ControlledInputComponent],
})
export class InsertClientComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    documentNumber: [''],
    birthDate: [''],
    registrationDate: [''],
    montlyIncome: [''],
    email: [''],
  });

  constructor(private fb: FormBuilder) {}
}
