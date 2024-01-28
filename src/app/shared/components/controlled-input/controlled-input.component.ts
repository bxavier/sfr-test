import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './controlled-input.component.html',
  styleUrl: './controlled-input.component.scss',
})
export class ControlledInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = 'input';
  @Output() valueChange = new EventEmitter<string>();

  control: FormControl = new FormControl('', Validators.required);

  get value(): string {
    return this.control.value;
  }

  set value(val: string) {
    this.control.setValue(val);
    this.valueChange.emit(val);
  }
}
