import { API_KEY } from './../../app/key';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  loading: any;

  key = API_KEY;    // api key
  id: any;          // input

  result: any = [];
  beatmaps = 0;    // output


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http: Http) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    let params = new URLSearchParams();
    params.set('k', this.key);
    params.set('u', this.id);
    params.set('limit', '4');

    this.loading = this.loadingCtrl.create({
      content: 'Fetching data...'
    });
    this.loading.present();

    this.http.get('https://osu.ppy.sh/api/get_user_best', { search: params }).map(res => res.json()).subscribe(data => {
      this.result = data;
      console.log(this.result);
      this.getBeatmaps();
    }, err => {
      this.loading.dismiss();
    })
  }

  getBeatmaps(){
    for(let i = 0; i < this.result.length; i++){
      let params = new URLSearchParams();
      params.set('k', this.key);
      params.set('b', this.result[i].beatmap_id);

      this.http.get('https://osu.ppy.sh/api/get_beatmaps', { search: params }).map(res => res.json()).subscribe(
        res => {
          this.result[i].beatmap_data = res[0];
          this.result[i].accuracy = this.getAccuracy(this.result[i]);
          this.beatmaps++;
          if(this.beatmaps == this.result.length) this.loading.dismiss();
          console.log(this.beatmaps, this.result[i]);
        },
        err => this.loading.dismiss()
      )
    }
  }

  getAccuracy(data){
    const vm = parseInt(data.countmiss);
    const v50 = parseInt(data.count50);
    const v100 = parseInt(data.count100);
    const v300 = parseInt(data.count300);

    const top = (50 * v50) + (100 * v100) + (300 * v300);
    const bot = 300 * (vm + v50 + v100 + v300);

    return top/bot;
  }
}
