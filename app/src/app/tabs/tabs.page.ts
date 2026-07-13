import { Component, EnvironmentInjector, inject } from '@angular/core';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonFab, 
  IonFabButton, 
  AlertController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, qrCodeOutline } from 'ionicons/icons';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],

  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private alertController: AlertController) {
  
    addIcons({ triangle, ellipse, square, qrCodeOutline });
  }

  async scanQRCode() {
    try {
     
      const status = await BarcodeScanner.requestPermissions();
      if (status.camera !== 'granted') {
        this.showAlert('Permissão Negada', 'Precisamos de acesso à câmera para ler o QR Code.');
        return;
      }

      // 2. Abre a câmera para escanear
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode]
      });

     
      if (barcodes.length > 0) {
        const qrContent = barcodes[0].displayValue;
        this.showAlert('Sucesso', `Código lido com sucesso: ${qrContent}`);
        
    
      }

    } catch (error) {
      console.error('Erro ao ler QR Code:', error);
    }
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}