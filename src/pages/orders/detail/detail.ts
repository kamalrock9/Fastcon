import { ToastProvider } from "./../../../providers/toast/toast";
import { LoadingProvider } from "./../../../providers/loading/loading";
import {
  SettingsProvider,
  WooCommerceProvider,
} from "./../../../providers/providers";
import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Toast,
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage({
  priority: "low",
})
@Component({
  selector: "page-order-detail",
  templateUrl: "detail.html",
})
export class OrderDetailPage {
  order: string = "detail";
  data: any;
  page: string = "placed";
  details: string = "";
  check: boolean = false;

  constructor(
    public nav: NavController,
    private params: NavParams,
    public settings: SettingsProvider,
    private toast: ToastProvider,
    private WC: WooCommerceProvider,
    public http: HttpClient,
    private zone: NgZone,
    private alertCtrl: AlertController,
    private loader: LoadingProvider,
    public translate: TranslateService,
    private iab: InAppBrowser
  ) {
    this.data = this.params.data.params;
    console.log(this.params.data.params);
    this.data.line_items.forEach((element) => {
      //console.log(element.id);
      this.WC.getProductThumb(element.product_id).subscribe(
        (res: any) => {
          this.zone.run(() => {
            element.img_src = res.src;
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });
    // this.trackyourOrder(this.data.id);
    this.customTrack(this.data.id);
  }

  trackyourOrder(data) {
    this.loader.show();
    this.WC.getOrderTrackData(data).subscribe(
      (res: any) => {
        console.log(res);
        this.check = true;
        this.loader.dismiss();
        if (res.status_code != 0) {
          if (res.tracking_data.track_status) {
            this.page = res.tracking_data.shipment_track[0].current_status;
          }
        }
      },
      (err) => {
        this.loader.dismiss();
        this.toast.showError();
      }
    );
  }

  customTrack(data) {
    this.loader.show();
    this.WC.getCustomOrderTrackData(data).subscribe(
      (res: any) => {
        console.log(res);
        if (
          res.status &&
          res.data.phoe_wc_manual_ship_enable &&
          res.data.phoe_wc_manual_ship_tracking_link != ""
        ) {
          this.zone.run(() => {
            this.details = res.data;
          });
          this.loader.dismiss();
        } else {
          this.trackyourOrder(this.data.id);
        }
      },
      (err) => {
        this.loader.dismiss();
        this.toast.showError();
      }
    );
  }

  customTrackOrder(link) {
    this.loader.show();
    let browser;
    browser = this.iab.create(link, "_self", {
      location: "no",
      clearcache: "yes",
      clearsessioncache: "yes",
    });
    this.loader.dismiss();
    // this.translate.get(["TRACK_ORDER", "NO", "YES"]).subscribe((x) => {
    //   this.alertCtrl
    //     .create({
    //       title: x.TRACK_ORDER,
    //       message: "Yes,For track the order",
    //       buttons: [
    //         {
    //           text: x.NO,
    //         },
    //         {
    //           text: x.YES,
    //           handler: () => {
    //             this.loader.show();
    //             let browser;
    //             browser = this.iab.create(link, "_self", {
    //               location: "no",
    //               clearcache: "yes",
    //               clearsessioncache: "yes",
    //             });
    //             this.loader.dismiss();
    //           },
    //         },
    //       ],
    //     })
    //     .present();
    // });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderDetailPage");
  }
  calculatePrice(x) {
    return x.prices_include_tax
      ? x.total
      : (Number(x.total) + Number(x.total_tax)).toFixed(2);
  }
  orderCancel() {
    let confirm = this.alertCtrl.create({
      title: "Cancel Order",
      message: "Are you sure you want to cancel this order",
      buttons: [
        {
          text: "No",
        },
        {
          text: "Yes",
          handler: () => {
            this.loader.show();
            let x = {
              status: "cancelled",
            };
            this.WC.updateOrder(this.data.id, x).then(
              (res) => {
                this.loader.dismiss();
                this.data.status = res.status;
              },
              (err) => {
                this.loader.dismiss();
                this.toast.showError();
              }
            );
          },
        },
      ],
    });
    confirm.present();
  }
}
