import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@services/auth';
import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    login: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const {login, password} = this.loginForm.value;

    this.authService.login(login!, password!).subscribe({
      next: (data) => {
        this.redirectUserByRole(data.role);
      },
      error: (error: HttpErrorResponse) => {
        alert('Ошибка авторизации');
        console.error(error);
      }
    });
  }

  private redirectUserByRole(role: string) {
    if (role === 'STUDENT') {
      this.router.navigate(['/profile']);
    }

    else if (role === 'SECRETARY' || role === 'CHIEF_SECRETARY') {
      this.router.navigate(['/students']);
    }

    else {
      alert('Неизвестная роль');
    }
  }
}
