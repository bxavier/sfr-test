import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidationService {
  static nameValidator(control: FormControl) {
    if (control.value) {
      const matches = control.value.match(
        /^([\[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]{3,})+\s+([\[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]{2,})+$/i
      );
      return matches ? null : { invalidName: true };
    } else {
      return null;
    }
  }

  static cpfValidator(control: FormControl) {
    const cpf = control.value.replace(/[^\d]+/g, '');
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        return { invalidCpf: true };
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

  static ageValidator(controle: FormControl) {
    const birth = controle.value;
    const [day, month, year] = birth.split('/');
    const today = new Date();
    const birthDate = new Date(year, month, day, 0, 0, 0);

    const eighteen = 1000 * 60 * 60 * 24 * 365 * 18;
    const sixty = 1000 * 60 * 60 * 24 * 365 * 60;

    if (today.getTime() - birthDate.getTime() >= eighteen && today.getTime() - birthDate.getTime() <= sixty)
      return null;

    return { invalidAge: true };
  }
}
