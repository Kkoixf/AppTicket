import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  AlertController
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonInput, IonButton,
    CommonModule, FormsModule
  ]
})
export class RegisterPage {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      await this.showAlert('Preencha todos os campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showAlert('As senhas não coincidem.');
      return;
    }

    if (this.password.length < 6) {
      await this.showAlert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    this.loading = true;
    const result = this.authService.register(this.email, this.password);
    this.loading = false;

    await this.showAlert(result.message);

    if (result.success) {
      this.router.navigateByUrl('/login');
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}