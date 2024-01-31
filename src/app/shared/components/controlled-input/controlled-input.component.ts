import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './controlled-input.component.html',
  styleUrl: './controlled-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlledInputComponent),
      multi: true,
    },
  ],
})
export class ControlledInputComponent implements ControlValueAccessor {
  @Input() parentForm: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type?: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() fieldName: string = '';
  @Input() mask: string | null = null;
  @Input() thousandSeparator: string = '';
  @Input() decimalMarker: '.' | ',' = ',';

  public value: string = '';
  public changed: (value: string) => void = () => {};
  public touched: () => void = () => {};
  public isDisabled: boolean = false;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public onChange(event: any): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('isDisabled', isDisabled);
    this.isDisabled = isDisabled;
  }

  // Should create a new component for the error message anso it can be better.
  getErrorMessages() {
    const errors: string[] = [];
    if (this.formField?.errors) {
      Object.keys(this.formField.errors).forEach((error: string) => {
        switch (error) {
          case 'required':
            errors.push('Campo obrigatório.');
            break;
          case 'email':
            errors.push('E-mail inválido.');
            break;
          case 'invalidCpf':
            errors.push('Número de CPF inválido.');
            break;
          case 'invalidAge':
            errors.push('Idade inválida.');
            break;
          case 'invalidName':
            errors.push('Nome e/ou sobrenome inválido.');
            break;
          default:
            errors.push('O campo contém erros.');
        }
      });
    }
    let errorReturn = '';
    errors.forEach(error => {
      errorReturn += error + ' ';
    });

    return errorReturn;
  }
}
