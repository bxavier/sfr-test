import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable()
export class ValidationService {
  // Name validation
  static nameValidator(control: FormControl) {
    if (control.value) {
      const matches = control.value.match(/^([\w]{3,})+\s+([\w\s]{2,})+$/i);
      return matches ? null : { invalidName: true };
    } else {
      return null;
    }
  }

  static cpfValidator(control: AbstractControl) {
    const cpf = control.value.replace(/[^\d]+/g, '');
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        return null;
      }
      console.log(cpf);

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          return { invalidCpf: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { invalidCpf: true };
        }
        return null;
      } else {
        return { invalidCpf: true };
      }
    }
    return null;
  }
}
