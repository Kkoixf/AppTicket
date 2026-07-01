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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonInput, IonButton,
    CommonModule, FormsModule
  ]
})
export class LoginPage {

  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      await this.showAlert('Preencha e-mail e senha.');
      return;
    }

    this.loading = true;
    const success = this.authService.login(this.email, this.password);
    this.loading = false;

    if (success) {
      this.router.navigateByUrl('/tabs/checkin');
    } else {
      await this.showAlert('E-mail ou senha inválidos.');
    }
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}