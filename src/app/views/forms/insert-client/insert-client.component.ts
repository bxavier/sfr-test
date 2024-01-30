import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlledInputComponent } from '../../../shared/components/controlled-input/controlled-input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-insert-client',
  standalone: true,
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ControlledInputComponent, ButtonComponent],
})
export class InsertClientComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, ValidationService.nameValidator]],
    documentNumber: ['', [Validators.required, ValidationService.cpfValidator]],
    birthDate: ['', [Validators.required, ValidationService.ageValidator]],
    registrationDate: { value: '', disabled: true },
    montlyIncome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    this.form.controls['registrationDate'].setValue(
      new Date().toJSON().slice(0, 10).replace(/-/g, '/').split('/').reverse().join('/').toString()
    );
  }

  constructor(private fb: FormBuilder) {}
}
