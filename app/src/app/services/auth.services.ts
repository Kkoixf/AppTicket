import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'admin_logged_in';

  // Teste de login com email e senha fixos
  private readonly ADMIN_EMAIL = 'admin';
  private readonly ADMIN_PASSWORD = 'admin';

  login(email: string, password: string): boolean {
    const isValid =
      email.trim().toLowerCase() === this.ADMIN_EMAIL &&
      password === this.ADMIN_PASSWORD;

    if (isValid) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
    }

    return isValid;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}