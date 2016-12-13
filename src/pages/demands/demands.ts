import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {Page} from 'ionic-framework/ionic';


import { DemandsSearch } from '../../providers/demands-search';
import { Delivery } from '../delivery/delivery';

@Component({
  selector: 'page-demands',
  templateUrl: 'demands.html',
  providers: [DemandsSearch]
})
export class Demands {
  public demand: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public demandsSearch: DemandsSearch,
    public http: Http) {
    this.loadDemands();
  }

  loadDemands() {
    this.demandsSearch.load()
      .then(data1 => {
        this.demand = data1;
      });
  }

  goToDelivey(delivery){
      var link = 'https://ufsm-deliveryrealtime-api.herokuapp.com/api/deliveries/'+delivery.address.address_id+'.json';
      var data = {"delivery":{"status": 'delivering'}};
      this.http.put(link, data)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);

      }, error => {
          console.log("Oooops!");
      });

		this.navCtrl.push(Delivery, delivery);
	}


}
