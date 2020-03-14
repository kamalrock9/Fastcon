import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LoadingProvider {
  load: any;
  constructor(
    private loader: LoadingController,
    private translate: TranslateService
  ) {}

  async show(dismissOnPageChange = true) {
    console.log("here");

    // this.translate.get(["LOADING"]).subscribe(x => {
    this.load = this.loader.create({
      //content: x.LOADING,
      // spinner: 'ios',
      cssClass: "loading-custom",
      content: `<div class="header">
                  </div>
                  <div class="content">
                    <div class="loader_outer">
                      <div class="loader">
                      </div>
                    </div>
                  </div>`,
      spinner: "hide",
      dismissOnPageChange: dismissOnPageChange
    });

    await this.load.present();
    // });
  }

  async showWithMessage(msg: string) {
    this.load = this.loader.create({
      //content: x.LOADING,
      // spinner: 'ios',
      cssClass: "loading-custom-msg",
      content: `<div class="header">
                  </div>
                  <div class="content">
                    <div class="loader_outer">
                      <div class="loader"></div></br>
                      ${msg}
                    </div>
                  </div>`,
      spinner: "hide",
      dismissOnPageChange: false
    });
    await this.load.present();
  }

  async dismiss() {
    if (this.load) {
      await this.load.dismiss();
      this.load = null;
    }
  }
}
