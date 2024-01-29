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
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type?: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() fieldName: string = 'input';
  @Input() mask: string = '';
  @Input() thousandSeparator: string = '';

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
    this.isDisabled = isDisabled;
  }
}
