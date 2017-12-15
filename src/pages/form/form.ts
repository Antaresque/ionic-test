import { API_KEY } from './key';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  model: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  formClick(){
    const key = API_KEY;
    const id = this.model.username;
    let params = new URLSearchParams();
    params.set('k', key);
    params.set('u', id);

    this.http.get('https://osu.ppy.sh/api/get_beatmaps', { search: params }).map(res => res.json()).subscribe(data => {
      console.log(data)
  })}
}
