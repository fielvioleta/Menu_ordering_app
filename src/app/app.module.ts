import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ProductsPage } from './../pages/products/products';
import { ProductPage } from './../pages/product/product';
import { CartPage } from '../pages/cart/cart';

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { GlobalProvider } from '../providers/global/global';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    ProductsPage,
    ProductPage,
    CartPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    ProductsPage,
    ProductPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    BarcodeScanner,
    Toast,
    GlobalProvider
  ]
})
export class AppModule {}
