import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import {startWith} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {BscService} from '../@devseer/services/api/bsc/bsc.service';
import {ContractService} from '../@devseer/services/contract/contract.service';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {environment} from 'src/environments/environment';
import {ThemeService} from "../@devseer/core/theme/theme.service";

@UntilDestroy()
@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainPage implements OnInit {

    public positionXContainer: number = 0;
    public selectedIndex = 0;
    public isActive: 'active'
    selected = true;
    currentTheme = 'dark';
    dark: string;
    light: string;
    theme: any = localStorage.getItem('theme');
    public themeColor = [
        {name: 'Default', class: 'default'},
        {name: 'Dark', class: 'dark'}
    ];

    public bignumber: 324534345345;
    public appPages = [
        {
            title: "My Balances",
            url: "/my-balances",
            icon: "assets/icons/wallet.svg"
        },
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: "assets/icons/dashboard.svg"
        },
        {
            title: "401(k) Staking plan",
            url: "/stake",
            icon: "assets/icons/stake.svg"
        },
        {
            title: "LP Staking Equity",
            url: "/lp-stake",
            icon: "assets/icons/money.svg"
        },
    ];
    public subPages = [

        {
            title: "USDC Bond",
            url: "/etf-bond",
        },
        {
            title: "OHM-ETH Bond",
            url: "/lp-bond",
        }

    ];
    logingOut: boolean =  false;

    public contractAddress =  environment.contract;
    public currentWindowWidth: number;
    public wallet;
    public shorten;
    public spinner: boolean = false;
    private obAction: Observable<any>;
    public balance: any = 0;
    public balanceUsd: any = 0;
    public profile: string;
    public username: string;
    public tokenBalance: any = 0;


    constructor(private contract: ContractService,
                private menuController: MenuController,
                public platform: Platform,
                private bscService: BscService,
                private themeService: ThemeService,
                public toastController: ToastController) {
    }

    ngOnInit() {
        if (this.theme) {
            if (JSON.parse(this.theme).checked) {
                this.themeService.activeTheme('dark');
                this.selected = true;
            } else {
                this.themeService.activeTheme('default');
                this.selected = false;
            }
        }
        this.currentTheme = this.themeService.getTheme();

        this.themeService.onThemeChange.subscribe((change) => {
            if (change) {
                this.currentTheme = change;
            }
        });
        this.currentWindowWidth = window.innerWidth;
        this.obAction = this.bscService.onAction;
        this.obAction.pipe(startWith(undefined),
            untilDestroyed(this))
            .subscribe(async (actions: any) => {
                if(actions) {
                    if(actions === 'save') {
                        this.connect();
                    }
                }
            });
        // this.contract.getTokeInfo(environment.contract, this.wallet).then((callback) => {
        //     this.bscService.member.next({mainToken: callback, dividend: undefined, bnb: this.balance,  balance: 0,  wallet: this.wallet});
        //     this.spinner = false;
        // }).catch();

        setInterval(()=> {
        
         }, 1 * 1000);
    }
    ngAfterViewInit(): void {
   
    }

    @HostListener('window:resize')
    onResize() {
        this.currentWindowWidth = window.innerWidth;
    }


    getContractInfo() {
        this.spinner = true;
        // this.contract.getTokeInfo(environment.contract, this.wallet).then((callback) => {
        //     // this.contract.getBVWalletBalance(this.wallet, environment.contract).then((balance) => {
        //     //     this.tokenBalance = balance;
        //     //     this.bscService.member.next({mainToken: callback, dividend: undefined, bnb: this.balance,  balance: balance,  wallet: this.wallet});
        //     //     this.spinner = false;
        //     // }).catch(() => this.spinner = false);
        //     this.spinner = false;
        // }).catch(() => this.spinner = false);
    }

    connect() {
        this.logingOut = true;
        this.contract.connectAccount().then(async (account) => {
            this.wallet = account;
            this.shorten = this.contract.shortenWallet(this.wallet);
            setTimeout(() => {
                this.contract.getWalletBalance(this.wallet).then((balances) => {
                    this.balance = Number(balances).toFixed(4);
                    this.wallet = account;
                    this.logingOut = false;
                    this.spinner = false;
                    this.bscService.member.next({mainToken: "callback", dividend: undefined, bnb: this.balance,  balance: this.balance,  wallet: this.wallet});
                }).catch(() => this.balance = 0);
            }, 1000);
        }).catch((err) => this.logingOut = false);
    }

    async logout() {
        this.logingOut = true;
        await this.contract.onDisconnect().then(async () => {
            this.wallet = undefined;
            this.shorten = undefined;
            this.balance = 0;
            this.balanceUsd = 0;
            this.bscService.member.next(undefined);
            // localStorage.clear();
            this.logingOut = false;
        }).catch((er) => this.logingOut = false);
    }

    async openMenu() {
        await this.menuController.open();
    }

    dynamicTheme(theme?: any) {
        if (theme.checked === false) {
            this.themeService.activeTheme('default');
        } else {
            this.themeService.activeTheme('dark');
        }
        localStorage.setItem('theme', JSON.stringify({checked: theme.checked}));
    }

    public error(): void {
        console.log('error');
        this.errorCopied();
    }

    public success(): void {
        console.log('success');
        this.successCopied();
    }

    async successCopied() {
        const toast = await this.toastController.create({
            message: 'Copied',
            duration: 2000,
        });
        await toast.present();
    }

    async errorCopied() {
        const toast = await this.toastController.create({
            message: 'Error coping',
            duration: 2000,
        });
        await toast.present();
    }

    async logoutSuccess() {
        const toast = await this.toastController.create({
            message: 'Logout Successful',
            duration: 2000,
        });
        await toast.present();
    }
}
