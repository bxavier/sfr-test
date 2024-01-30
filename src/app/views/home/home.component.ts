import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ControlledInputComponent } from '../../shared/components/controlled-input/controlled-input.component';
import { IClient } from '../../models/client.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, ButtonComponent, ControlledInputComponent],
})
export class HomeComponent {
  items: IClient[] = [
    {
      id: 1,
      name: 'Bruno 1',
      documentNumber: '123456789',
      birthDate: '01/02/1981',
      registrationDate: '01/01/2021',
      montlyIncome: 1000.0,
      email: 'bruno@brunoxavier.com.br',
    },
    {
      id: 2,
      name: 'Bruno 2',
      documentNumber: '123456789',
      birthDate: '01/02/1981',
      registrationDate: '01/01/2021',
      montlyIncome: 1000.0,
      email: 'bruno@brunox.com.br',
    },
    {
      id: 3,
      name: 'Bruno 3',
      documentNumber: '123456789',
      birthDate: '01/02/1981',
      registrationDate: '01/01/2021',
      montlyIncome: 1000.0,
      email: 'asd@brun.com',
    },
  ];
}
