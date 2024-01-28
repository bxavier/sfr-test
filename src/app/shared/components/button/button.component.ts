import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = 'FullWidth';
  @Input() color: string = 'primary';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() clickAction = new EventEmitter<void>();

  onClick() {
    this.clickAction.emit();
  }
}
