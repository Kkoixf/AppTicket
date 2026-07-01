import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'admin_logged_in';
  private readonly USERS_KEY = 'admin_users';

  constructor() {
  
    if (!localStorage.getItem(this.USERS_KEY)) {
      const defaultUser: User = { email: 'admin@evento.com', password: 'admin123' };
      localStorage.setItem(this.USERS_KEY, JSON.stringify([defaultUser]));
    }
  }

  private getUsers(): User[] {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(email: string, password: string): { success: boolean; message: string } {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();

    if (users.some(u => u.email === normalizedEmail)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    users.push({ email: normalizedEmail, password });
    this.saveUsers(users);

    return { success: true, message: 'Cadastro realizado com sucesso! Faça login.' };
  }

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const isValid = users.some(u => u.email === normalizedEmail && u.password === password);

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