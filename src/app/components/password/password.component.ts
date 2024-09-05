import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

export function checkPasswordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value || '';

    const regexes = {
      simple: /^[a-zA-Z0-9!@#$%^&*()_+]+$/,
      medium: [
        /(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])/,
        /(?=.*[a-zA-Z])(?=.*\d)/,
        /(?=.*\d)(?=.*[!@#$%^&*()_+])/,
      ],
      strong: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).+$/,
    };

    if (regexes.strong.test(password)) {
      return { weakPassword: 'strong' }; 
    }

    if (regexes.medium.some(regex => regex.test(password))) {
      return { weakPassword: 'medium' }; 
    }

    if (regexes.simple.test(password)) {
      return { weakPassword: 'easy' }; 
    }

    return { weakPassword: 'empty' };
  };
}

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, checkPasswordStrength()]),
  });

  public sectionColors: string[] = ['gray', 'gray', 'gray'];

  public updateProgressBar(): void {
    const passwordControl = this.passwordForm.get('password');
    const password = passwordControl?.value || '';

    if (password.length < 8 && password.length > 0) {
      this.sectionColors = ['red', 'red', 'red'];
      return;
    }

    const strength = passwordControl?.errors?.['weakPassword'];

    const colorMap: Record<string, string[]> = {
      empty: ['gray', 'gray', 'gray'],
      easy: ['red', 'gray', 'gray'],
      medium: ['rgb(255, 226, 98)', 'rgb(255, 226, 98)', 'gray'],
      strong: ['green', 'green', 'green'],
    };

    this.sectionColors = colorMap[strength || 'empty'];
  }
}
