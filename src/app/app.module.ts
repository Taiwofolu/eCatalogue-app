import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
//import { ScrollingModule } from '@angular/cdk/scrolling/ngx';
//import { DragDropModule } from '@angular/cdk/drag-drop/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CardIO } from '@ionic-native/card-io/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { KeysPipeModule } from '../app/pipes/pipe.module';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { Braintree } from '@ionic-native/braintree/ngx';
import { HomePage } from './home/home.page';


//Uncomment when you use Google Login
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
//import { Facebook } from '@ionic-native/facebook/ngx';


//pages
import { FilterPage } from '../app/filter/filter.page';
import { OrderSummaryPage } from './checkout/order-summary/order-summary.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CacheModule } from 'ionic-cache';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CategoriesPage } from './categories/categories.page';
import { SearchPage } from './search/search.page';
import { AccountPage } from './account/account.page';
import { ProductsPage } from './products/products.page';
import { ProductPage } from './product/product.page';
import { ReviewPage } from './review/review.page';
import { Product } from './data/product';
import { BlogPage } from './account/blog/blog.page';
import { BlogsPage } from './account/blogs/blogs.page';
import { PostPage } from './post/post.page';
import { PostsPage } from './posts/posts.page';
import { IonicStorageModule } from '@ionic/storage';
import { FavoriteService } from './favorite.service';
import { FavoritePage } from './favorite/favorite.page';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
  AppComponent,
  FilterPage,
  OrderSummaryPage,
  HomePage,
  CategoriesPage,
  SearchPage,
  AccountPage,
  ProductsPage,
  ProductPage,
  ReviewPage,
  BlogsPage,
  PostPage,
  PostsPage,
  FavoritePage
  ],
  entryComponents: [
  FilterPage,
  OrderSummaryPage,
  HomePage,
  ],
  imports: [BrowserModule, 
  FormsModule, 
  HttpClientModule,
   KeysPipeModule,
   CacheModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      })
     ],

  providers: [
    StatusBar,
    SplashScreen,
    HomePage,
    //Braintree,
    //GooglePlus,
    //Facebook,
    OneSignal,
    FavoriteService,
    NativeStorage,
    InAppBrowser,
    FormBuilder,
    CardIO,
    ReactiveFormsModule,
    AppMinimize,
    EmailComposer,
    AppRate,
    SocialSharing,
    PhotoViewer,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}