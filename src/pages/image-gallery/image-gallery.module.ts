import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ImageGalleryPage } from "./image-gallery";
import { IonicImageLoader } from "ionic-image-loader";

@NgModule({
  declarations: [ImageGalleryPage],
  imports: [IonicPageModule.forChild(ImageGalleryPage), IonicImageLoader],
  exports: [],
})
export class ImageGalleryPageModule {}
