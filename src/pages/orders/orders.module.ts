import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "./../../pipes/pipes.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { OrdersPage } from "./orders";
import { IonicImageLoader } from "ionic-image-loader";

@NgModule({
  declarations: [OrdersPage],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    TranslateModule.forChild(),
    PipesModule,
    IonicImageLoader,
  ],
})
export class OrdersPageModule {}
