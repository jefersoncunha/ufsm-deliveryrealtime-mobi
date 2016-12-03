import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DemandsSearch } from '../../providers/demands-search';
import { Http } from '@angular/http';

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

  changeStatus(status, id){
    var link = 'http://localhost:8100/api/deliveries/'+id+'.json';
    var data = {
      "delivery":{
        "status": status
      }
    };
    this.http.put(link, data)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);

    }, error => {
        console.log("Oooops!");
    });
  }

}
