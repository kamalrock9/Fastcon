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

  constructor(
    public nav: NavController,
    private params: NavParams,
    public settings: SettingsProvider,
    private toast: ToastProvider,
    private WC: WooCommerceProvider,
    public http: HttpClient,
    private zone: NgZone,
    private alertCtrl: AlertController,
    private loader: LoadingProvider
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
    this.trackyourOrder(this.data.id);
  }

  trackyourOrder(data) {
    this.loader.show();
    this.WC.getOrderTrackData(data).subscribe(
      (res: any) => {
        console.log(res);
        this.loader.dismiss();
        if (res.tracking_data.track_status) {
          this.page = res.tracking_data.shipment_track[0].current_status;
        }
      },
      (err) => {
        this.loader.dismiss();
        this.toast.showError();
      }
    );
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
