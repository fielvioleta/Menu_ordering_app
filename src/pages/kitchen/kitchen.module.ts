import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KitchenPage } from './kitchen';

@NgModule({
  declarations: [
    KitchenPage,
  ],
  imports: [
    IonicPageModule.forChild(KitchenPage),
  ],
})
export class KitchenPageModule {}
