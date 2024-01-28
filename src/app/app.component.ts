import {ThemeService} from './@devseer/core/theme/theme.service';
import {AuthenticationService} from './@devseer/core/authentication-service.service';
import {BehaviorSubject} from 'rxjs';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ContractService} from './@devseer/services/contract/contract.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    theme: any = localStorage.getItem('theme');

    constructor(
        private menu: MenuController,
        private platform: Platform,
        private router: Router,
        private storage: Storage,
        public contract: ContractService,
        private themeService: ThemeService
    ) {
        this.initializeApp();
    }


    openTutorial() {
        this.menu.enable(false);
        this.storage.set('ion_did_tutorial', false);
        this.router.navigateByUrl('/tutorial');
    }


    initializeApp() {
        this.platform.ready().then(() => {
            if (this.theme) {
                if (JSON.parse(this.theme).checked) {
                    this.themeService.activeTheme('dark');
                } else if (JSON.parse(this.theme).checked === false) {
                    this.themeService.activeTheme('default');
                } else {
                    this.themeService.activeTheme('dark');
                }
            } else {
                this.themeService.activeTheme('dark');
                localStorage.setItem('theme', JSON.stringify({checked: true}));
            }
        });
    }

}
