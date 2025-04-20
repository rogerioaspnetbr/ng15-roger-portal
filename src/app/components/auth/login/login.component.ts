import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="grid-item">
              <label>Email</label>
              <input type="email" formControlName="email" class="form-control">
              <div class="error" *ngIf="loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched">
                Email é obrigatório
              </div>
              <div class="error" *ngIf="loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched">
                Email inválido
              </div>
            </div>

            <div class="grid-item">
              <label>Senha</label>
              <div class="password-input">
                <input [type]="hidePassword ? 'password' : 'text'" formControlName="password" class="form-control">
                <button type="button" (click)="togglePassword()" class="toggle-password">
                  {{hidePassword ? 'Mostrar' : 'Ocultar'}}
                </button>
              </div>
              <div class="error" *ngIf="loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched">
                Senha é obrigatória
              </div>
              <div class="error" *ngIf="loginForm.get('password')?.hasError('minlength') && loginForm.get('password')?.touched">
                Senha deve ter no mínimo 6 caracteres
              </div>
            </div>

            <div class="grid-item full-width">
              <button type="submit" [disabled]="!loginForm.valid" class="submit-button">
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 600px;
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .grid-item {
      display: flex;
      flex-direction: column;
    }
    .full-width {
      grid-column: 1 / -1;
    }
    label {
      margin-bottom: 0.5rem;
      color: #666;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      outline: none;
      border-color: #007bff;
    }
    .password-input {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
    }
    .toggle-password {
      padding: 0.75rem 1rem;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
    }
    .toggle-password:hover {
      background: #e0e0e0;
    }
    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .submit-button {
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .submit-button:hover {
      background-color: #0056b3;
    }
    .submit-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // Here you would typically make an API call to authenticate
      this.router.navigate(['/']);
    }
  }
}
