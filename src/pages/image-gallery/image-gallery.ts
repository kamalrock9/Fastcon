import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Platform,
} from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * Generated class for the ImageGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: "high",
})
@Component({
  selector: "page-image-gallery",
  templateUrl: "image-gallery.html",
})
export class ImageGalleryPage {
  @ViewChild("slider") slider: Slides;
  product: any;
  ind: 0;
  dir: string;
  slidesPerView = {
    nnnowCategory: 3.2,
    basicProductGrid: 3.5,
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private photoViewer: PhotoViewer
  ) {
    this.dir = platform.dir();
    console.log(this.navParams.data.params);
    this.product = [
      ...this.navParams.data.params.images,
      ...this.navParams.data.params.extraImages,
    ];
    console.log(this.product);
  }

  changeIndex(i) {
    console.log(i);
    this.ind = i;
    this.slider.slideTo(i);
  }

  zoomImage(src, name) {
    this.photoViewer.show(src, name, { share: false });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ImageGalleryPage");
  }
}
