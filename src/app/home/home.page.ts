import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Data } from '../data';
import { Settings } from '../data/settings';
import { Product } from '../data/product';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Config } from '../config';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    tempProducts: any = [];
    filter: any = {};
    hasMoreItems: boolean = true;
    cart: any;
    slideOpts = { effect: 'flip', autoplay: true, parallax: true, loop: true, lazy: true };
    constructor(private config: Config, public api: ApiService, private splashScreen: SplashScreen, public platform: Platform, public translateService: TranslateService, public data: Data, public settings: Settings, public product: Product, public loadingController: LoadingController, public router: Router, public navCtrl: NavController, public route: ActivatedRoute, private oneSignal: OneSignal, private nativeStorage: NativeStorage) {
        this.filter.page = 1;
        this.filter.status = 'publish';
    }
    ngOnInit() {
        this.nativeStorage.getItem('blocks').then(data => {
            this.data.blocks = data.blocks;
            this.data.categories = data.categories;
            this.data.products = data.products;
            this.data.mainCategories = this.data.categories.filter(item => item.parent == 0);
            this.settings.pages = this.data.blocks.pages;
            this.settings.settings = this.data.blocks.settings;
            this.settings.dimensions = this.data.blocks.dimensions;
            this.settings.currency = this.data.blocks.settings.currency;
            this.settings.calc(this.platform.width());
            if (this.settings.colWidthLatest == 4) this.filter.per_page = 15;
            //this.settings.theme = this.data.blocks.theme;
            this.splashScreen.hide();
        }, error => console.error(error));

        this.nativeStorage.getItem('settings').then(data => {
            if(data.lang){
                this.config.lang = data.lang;
                this.translateService.setDefaultLang(data.lang);
                if(data.lang == 'ar'){
                    document.documentElement.setAttribute('dir', 'rtl');
                }
            }
        }, error => console.error(error));

        this.getBlocks();
    }
    getCart() {
        this.api.postItem('cart').subscribe(res => {
            this.cart = res;
            this.data.updateCart(this.cart.cart_contents);
        }, err => {
            console.log(err);
        });
    }
    getBlocks() {
        this.api.postItem('keys').subscribe(res => {
            this.data.blocks = res;
            if(this.data.blocks.user != undefined)
            this.settings.user = this.data.blocks.user.data;
            //this.settings.theme = this.data.blocks.theme;
            this.settings.pages = this.data.blocks.pages;
            if(this.data.blocks.user)
            this.settings.reward = this.data.blocks.user.data.points_vlaue;
            if(this.data.blocks.languages)
            this.settings.languages = Object.keys(this.data.blocks.languages).map(i => this.data.blocks.languages[i]);
            this.settings.settings = this.data.blocks.settings;
            this.settings.dimensions = this.data.blocks.dimensions;
            this.settings.currency = this.data.blocks.settings.currency;
            if(this.data.blocks.categories){
                this.data.categories = this.data.blocks.categories.filter(item => item.name != 'Uncategorized');
                this.data.mainCategories = this.data.categories.filter(item => item.parent == 0);
            }

            this.settings.calc(this.platform.width());
            if (this.settings.colWidthLatest == 4) this.filter.per_page = 15;
            this.splashScreen.hide();
            this.getCart();
            this.processOnsignal();
            if (this.data.blocks.user) {
                this.settings.customer.id = this.data.blocks.user.ID;
                if(this.data.blocks.user.allcaps.dc_vendor || this.data.blocks.user.allcaps.seller || this.data.blocks.user.allcaps.wcfm_vendor){
                    this.settings.vendor = true;
                }
            }
            for (let item in this.data.blocks.blocks) {
                var filter;
                if (this.data.blocks.blocks[item].block_type == 'flash_sale_block') {
                    this.data.blocks.blocks[item].interval = setInterval(() => {
                        var countDownDate = new Date(this.data.blocks.blocks[item].sale_ends).getTime();
                        var now = new Date().getTime();
                        var distance = countDownDate - now;
                        this.data.blocks.blocks[item].days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        this.data.blocks.blocks[item].hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        this.data.blocks.blocks[item].minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        this.data.blocks.blocks[item].seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        if (distance < 0) {
                            clearInterval(this.data.blocks.blocks[item].interval);
                            this.data.blocks.blocks[item].hide = true;
                        }
                    }, 1000);
                }
            }
            if (this.data.blocks.settings.show_latest) {
                this.api.getItem('products', this.filter ).subscribe(res => {
                    this.data.products = res;
                }, err => {
                    console.log(err);
                });
            }
            if (this.data.blocks.user) {
                this.api.postItem('get_wishlist').subscribe(res => {
                    for (let item in res) {
                        this.settings.wishlist[res[item].id] = res[item].id;
                    }
                }, err => {
                    console.log(err);
                });
            }

            this.nativeStorage.setItem('blocks', {
                    blocks: this.data.blocks,
                    categories: this.data.categories,
                    // products: this.data.products
                }).then(
            () => console.log('Stored item!'), error => console.error('Error storing item', error));
                
            /* Product Addons */
            if(this.data.blocks.settings.switchAddons){
                this.api.getAddonsList('product-add-ons').subscribe(res => {
                    this.settings.addons = res;
                });
            }
        }, err => {
            console.log(err);
        }); 
    }
    goto(item) {
        if (item.description == 'category') this.navCtrl.navigateForward('/home/products/' + item.url);
        else if (item.description == 'product') this.navCtrl.navigateForward('/home/product/' + item.url);
        else if (item.description == 'post') this.navCtrl.navigateForward('/home/post/' + item.url);
    }
    getProduct(item) {
        this.product.product = item;
        this.navCtrl.navigateForward('/home/product/' + item.id);
    }
    getSubCategories(id) {
        const results = this.data.categories.filter(item => item.parent === parseInt(id));
        return results;
    }
    getCategory(id) {
        this.navCtrl.navigateForward('/home/products/' + id);
    }
    loadData(event) {
        this.filter.page = this.filter.page + 1;
        this.api.getItem('products', this.filter).subscribe(res => {
            this.tempProducts = res;
            this.data.products.push.apply(this.data.products, this.tempProducts);
            event.target.complete();
            if (this.tempProducts.length == 0) this.hasMoreItems = false;
        }, err => {
            event.target.complete();
        });
        console.log('Done');
    }
    processOnsignal() {
        this.oneSignal.startInit(this.data.blocks.settings.onesignal_app_id, this.data.blocks.settings.google_project_id);
        //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe(() => {
            //do something when notification is received
        });
        this.oneSignal.handleNotificationOpened().subscribe(result => {
            if (result.notification.payload.additionalData.category) {
                this.navCtrl.navigateForward('/home/products/' + result.notification.payload.additionalData.category);
            } else if (result.notification.payload.additionalData.product) {
                this.navCtrl.navigateForward('/home/product/' + result.notification.payload.additionalData.product);
            } else if (result.notification.payload.additionalData.post) {
                this.navCtrl.navigateForward('/home/post/' + result.notification.payload.additionalData.post);
            } else if (result.notification.payload.additionalData.order) {
                this.navCtrl.navigateForward('/account/orders/order/' + result.notification.payload.additionalData.order);
            }
        });
        this.oneSignal.endInit();
    }
    doRefresh(event) {
        this.filter.page = 1;
        this.getBlocks();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }
}