import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { LocationTracker } from '../../providers/location-tracker';
import { Http } from '@angular/http';

@Component({
  selector: 'home-delivery',
  templateUrl: 'delivery.html'
})


export class Delivery {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public locationTracker: LocationTracker,
    public http: Http
  ){
    this.start();
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

  start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }

  postLocation(){
    this.locationTracker.postLocation();
  }


}
