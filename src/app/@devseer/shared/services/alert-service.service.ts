import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonAlertService {

  toast;
  loading;

  constructor(private toastController: ToastController,
              private alertController: AlertController,
              private loadingController: LoadingController) {
  }

  async presentToast(message: any) {
    this.toast = await this.toastController.create({
      message,
      duration: 10000,
      position: 'bottom',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           this.dismissToast();
          }
        }
      ]
    });
    this.toast.present();
  }

  async dismissToast() {
    return this.toast.dismiss();
  }

  async presentAlert(header, message, buttons, cssClass?) {
    const confirm = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass
    });
    await confirm.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    const {role, data} = await this.loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async dismissDefaultLoading() {
    this.loading.dismiss();
  }
}
