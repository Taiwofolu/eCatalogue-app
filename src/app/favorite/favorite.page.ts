import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavController, ModalController, ToastController  } from '@ionic/angular';
import { Data } from '../data';
import { Settings } from '../data/settings';
import { Product } from '../data/product';
import { FilterPage } from '../filter/filter.page';
import { Vendor } from '../data/vendor';
import { CacheService } from 'ionic-cache';
import { FavoriteService } from '../favorite.service';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favoriteFilms';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {
  category: string;
  products: any = [];
  tempProducts: any = [];
  subCategories: any = [];
  filter: any = {};
  attributes: any;
  hasMoreItems: boolean = true;
  loader: boolean = false;
  searchInput: any;
  showSearch: boolean = true;
  

  constructor(public vendor: Vendor, public storage: Storage, public favoriteService: FavoriteService, public modalController: ModalController, public api: ApiService, private cache: CacheService, private toastController: ToastController, public data: Data, public product: Product, public settings: Settings, public router: Router, public navCtrl: NavController, public route: ActivatedRoute) {}
    

  //   getProducts(id) {
  //       // console.log(this.data.categories);
  //       this.navCtrl.navigateForward('/categories/products/' + id);
  //   }
  //   getProduct(product) {
  //     this.product.product = product;
  //     this.navCtrl.navigateForward(this.router.url + '/product/' + product.id);
  // }

  getAllFavoriteFilms() {
    return this.storage.get(STORAGE_KEY);
  }

  loadProducts() {
    this.loader = true;
    this.api.getItem('products', this.filter).subscribe(
        res => {this.products = res;
            this.loader = false;
        }, 
        err => {console.log(err);}
    );
    
    this.getAllFavoriteFilms().then( function(res) {
        const favs = res;
        // res.indexOf();
        console.log(favs);
        console.log(favs.length);
        
    }); 
    // console.log(items); 
}

getAttributes() {
    this.api.postItem('product-attributes', {
        category: this.filter.category
    }).subscribe(res => {
        this.attributes = res;
    }, err => {
        console.log(err);
    });
}

  ngOnInit() {

    console.log(this.data);
    console.log(this.product);
    console.log(this.products);
    console.log(this.data);
    this.loadProducts();
    this.getAttributes();

}

    // subCategories(id){
	//   return this.data.categories.filter(item => item.parent == id);
	// }
  	// showSubCategory(i){
	//   	let intial = this.data.mainCategories[i].show;
	//   	this.data.mainCategories.forEach(item => item.show = false);
	//   	this.data.mainCategories[i].show = !intial;
  	// }
}
