import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';


@Injectable()
export class SpinnerInterceptor {

  isLoading = false;

  constructor(
    public loadingController: LoadingController
  ) {
  }

  public loader: any;

  async present(message?: string) {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message
    });
    await this.loader.present();
  }


  async dismiss() {
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        // throw new Error('Could not dismiss the topmost loader. Aborting...');
        break
      }
      topLoader = await this.loadingController.getTop();
    }
  }
}
